#!/usr/bin/env node
/**
 * Batch-add `robots: { index: false }` to dead weight blog pages.
 * Run: node scripts/noindex-dead-pages.mjs
 */
import fs from 'fs';
import path from 'path';

const DEAD_PAGES = [
  'app/blog/stop-emailing-yourself-notes/page.tsx',
  'app/blog/what-is-a-live-clipboard/page.tsx',
  'app/blog/what-is-an-online-clipboard-complete-guide/page.tsx',
  'app/blog/how-to-share-clipboard-online/page.tsx',
  'app/blog/online-clipboard-vs-desktop-apps/page.tsx',
  'app/blog/online-clipboard-vs-cloud-notes/page.tsx',
  'app/blog/is-online-clipboard-secure/page.tsx',
  'app/blog/best-online-clipboard-tools-2026/page.tsx',
  'app/blog/how-to-sync-clipboard-between-devices/page.tsx',
  'app/blog/syncclip-vs-universal-clipboard/page.tsx',
  'app/blog/5-ways-to-copy-text-between-phone-and-laptop/page.tsx',
  'app/blog/share-text-across-devices/page.tsx',
  'app/blog/sync-clipboard-mac-windows/page.tsx',
  'app/blog/copy-phone-to-pc-without-app/page.tsx',
  'app/blog/pushbullet-alternatives-2026/page.tsx',
];

const ROOT = path.resolve(process.cwd());

let modified = 0;
let skipped = 0;

for (const rel of DEAD_PAGES) {
  const filePath = path.join(ROOT, rel);
  if (!fs.existsSync(filePath)) {
    console.log(`SKIP (not found): ${rel}`);
    skipped++;
    continue;
  }

  let content = fs.readFileSync(filePath, 'utf-8');

  if (content.includes('index: false')) {
    console.log(`SKIP (already noindexed): ${rel}`);
    skipped++;
    continue;
  }

  const metadataPattern = /export\s+const\s+metadata:\s*Metadata\s*=\s*\{/;
  const match = content.match(metadataPattern);
  if (!match) {
    console.log(`SKIP (no metadata found): ${rel}`);
    skipped++;
    continue;
  }

  const insertPos = match.index + match[0].length;
  const robotsDirective = `\n  robots: { index: false },`;
  content = content.slice(0, insertPos) + robotsDirective + content.slice(insertPos);

  fs.writeFileSync(filePath, content, 'utf-8');
  console.log(`DONE: ${rel}`);
  modified++;
}

console.log(`\n✅ Modified: ${modified}, Skipped: ${skipped}`);
