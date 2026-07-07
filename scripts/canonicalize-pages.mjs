#!/usr/bin/env node
/**
 * Batch-update canonical URLs on consolidated pages to point to their flagship.
 * Run: node scripts/canonicalize-pages.mjs
 */
import fs from 'fs';
import path from 'path';

const CANONICAL_MAP = [
  // Theme 1: Android-to-PC
  { page: 'app/copy-text-from-phone-to-computer/page.tsx', canonical: '/android-to-pc-clipboard' },
  { page: 'app/send-text-mobile-to-laptop/page.tsx', canonical: '/android-to-pc-clipboard' },
  { page: 'app/share-text-without-whatsapp/page.tsx', canonical: '/android-to-pc-clipboard' },
  { page: 'app/how-to-send-otp-from-phone-to-pc/page.tsx', canonical: '/android-to-pc-clipboard' },
  { page: 'app/blog/copy-text-from-android-phone-to-windows-pc-instantly/page.tsx', canonical: '/android-to-windows' },
  { page: 'app/blog/how-to-share-text-between-android-and-windows-without-whatsapp-or-cable/page.tsx', canonical: '/android-to-windows' },
  { page: 'app/blog/how-to-share-clipboard-between-android-and-windows-pc/page.tsx', canonical: '/android-to-windows' },
  { page: 'app/blog/share-text-between-mobile-and-laptop-without-whatsapp/page.tsx', canonical: '/android-to-pc-clipboard' },

  // Theme 2: No-Install Clipboard
  { page: 'app/clipboard-sync-free-no-account/page.tsx', canonical: '/clipboard' },
  { page: 'app/cross-device-clipboard/page.tsx', canonical: '/clipboard' },
  { page: 'app/temporary-clipboard-online/page.tsx', canonical: '/online-clipboard' },
  { page: 'app/clipboard-vs-email/page.tsx', canonical: '/clipboard' },
  { page: 'app/clipboard-alternative-to-email/page.tsx', canonical: '/clipboard' },
  { page: 'app/fastest-way-to-copy-links-between-devices/page.tsx', canonical: '/clipboard' },
  { page: 'app/share-links-between-devices/page.tsx', canonical: '/clipboard' },
  { page: 'app/share-text-across-devices-free/page.tsx', canonical: '/clipboard' },
  { page: 'app/blog/how-to-sync-clipboard-without-installing-anything/page.tsx', canonical: '/clipboard' },
  { page: 'app/blog/free-clipboard-sync-no-account/page.tsx', canonical: '/clipboard' },
  { page: 'app/blog/online-clipboard-without-installing-anything-or-using-a-network-app/page.tsx', canonical: '/online-clipboard' },
  { page: 'app/blog/how-to-copy-and-paste-online-between-two-devices-using-a-link/page.tsx', canonical: '/clipboard' },
  { page: 'app/blog/sync-clipboard-between-devices-without-same-wifi/page.tsx', canonical: '/clipboard' },
  { page: 'app/blog/what-is-the-best-online-clipboard-that-syncs-automatically-in-real-time/page.tsx', canonical: '/clipboard' },
  { page: 'app/blog/what-is-the-best-free-online-clipboard/page.tsx', canonical: '/online-clipboard' },
  { page: 'app/blog/best-free-clipboard-manager/page.tsx', canonical: '/online-clipboard' },
  { page: 'app/blog/can-i-sync-clipboard-android-windows-free/page.tsx', canonical: '/clipboard' },
  { page: 'app/blog/fastest-way-to-copy-text-without-app/page.tsx', canonical: '/clipboard' },

  // Theme 3: Developer
  { page: 'app/blog/cross-device-clipboard-sync-for-developers-copy-code-snippets-instantly/page.tsx', canonical: '/move-code-snippet-between-devices' },
];

const ROOT = path.resolve(process.cwd());
const BASE = 'https://syncclip.in';

let modified = 0;
let skipped = 0;

for (const { page, canonical } of CANONICAL_MAP) {
  const filePath = path.join(ROOT, page);
  if (!fs.existsSync(filePath)) {
    console.log(`SKIP (not found): ${page}`);
    skipped++;
    continue;
  }

  let content = fs.readFileSync(filePath, 'utf-8');
  const fullCanonical = `${BASE}${canonical}`;

  // Check if already points to the correct canonical
  if (content.includes(fullCanonical) || content.includes(`canonical: "${canonical}"`)) {
    console.log(`SKIP (already correct): ${page}`);
    skipped++;
    continue;
  }

  // Replace existing canonical value
  // Pattern 1: canonical: "https://syncclip.in/..."
  // Pattern 2: canonical: "/..."
  const canonicalPatterns = [
    /canonical:\s*"https:\/\/syncclip\.in\/[^"]*"/,
    /canonical:\s*"\/[^"]*"/,
  ];

  let replaced = false;
  for (const pattern of canonicalPatterns) {
    if (pattern.test(content)) {
      content = content.replace(pattern, `canonical: "${fullCanonical}"`);
      replaced = true;
      break;
    }
  }

  if (!replaced) {
    console.log(`SKIP (no canonical found to replace): ${page}`);
    skipped++;
    continue;
  }

  fs.writeFileSync(filePath, content, 'utf-8');
  console.log(`DONE: ${page} → ${canonical}`);
  modified++;
}

console.log(`\n✅ Modified: ${modified}, Skipped: ${skipped}`);
