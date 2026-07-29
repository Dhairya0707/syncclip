const https = require('https');

const HOST = 'syncclip.in';
const KEY = 'c9f8e7d6b5a43210fdecba9876543210';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;

const urlList = [
  // Core
  `https://${HOST}/`,
  `https://${HOST}/about`,
  `https://${HOST}/support`,
  `https://${HOST}/privacy`,
  `https://${HOST}/feedback`,

  // Landing Pages
  `https://${HOST}/clipboard`,
  `https://${HOST}/online-clipboard`,
  `https://${HOST}/clipboard-sync-guide`,
  `https://${HOST}/clipboard-sync-free-no-account`,
  `https://${HOST}/temporary-clipboard-online`,
  `https://${HOST}/clipboard-alternative-to-email`,
  `https://${HOST}/clipboard-vs-email`,
  `https://${HOST}/share-text-across-devices-free`,
  `https://${HOST}/android-to-pc-clipboard`,
  `https://${HOST}/android-to-windows`,
  `https://${HOST}/mac-to-windows-clipboard`,
  `https://${HOST}/copy-text-from-phone-to-computer`,
  `https://${HOST}/send-text-mobile-to-laptop`,
  `https://${HOST}/cross-device-clipboard`,
  `https://${HOST}/move-code-snippet-between-devices`,
  `https://${HOST}/pastebin-alternative`,
  `https://${HOST}/pastebin-alternative-private`,
  `https://${HOST}/pushbullet-alternative`,
  `https://${HOST}/how-to-send-otp-from-phone-to-pc`,
  `https://${HOST}/fastest-way-to-copy-links-between-devices`,
  `https://${HOST}/share-text-without-whatsapp`,
  `https://${HOST}/share-links-between-devices`,

  // Blog
  `https://${HOST}/blog`,
  `https://${HOST}/blog/5-ways-to-copy-text-between-phone-and-laptop`,
  `https://${HOST}/blog/best-free-clipboard-manager`,
  `https://${HOST}/blog/best-online-clipboard-tools-2026`,
  `https://${HOST}/blog/can-i-sync-clipboard-android-windows-free`,
  `https://${HOST}/blog/clipboard-sync-for-remote-teams`,
  `https://${HOST}/blog/clipboard-sync-indian-developers`,
  `https://${HOST}/blog/copy-phone-to-pc-without-app`,
  `https://${HOST}/blog/copy-text-from-android-phone-to-windows-pc-instantly`,
  `https://${HOST}/blog/cross-device-clipboard-sync-for-developers-copy-code-snippets-instantly`,
  `https://${HOST}/blog/fastest-way-to-copy-text-without-app`,
  `https://${HOST}/blog/free-clipboard-sync-no-account`,
  `https://${HOST}/blog/how-to-copy-and-paste-online-between-two-devices-using-a-link`,
  `https://${HOST}/blog/how-to-copy-text-from-android-to-mac`,
  `https://${HOST}/blog/how-to-share-clipboard-between-android-and-windows-pc`,
  `https://${HOST}/blog/how-to-share-clipboard-online`,
  `https://${HOST}/blog/how-to-share-text-between-android-and-windows-without-whatsapp-or-cable`,
  `https://${HOST}/blog/how-to-sync-clipboard-between-devices`,
  `https://${HOST}/blog/how-to-sync-clipboard-without-installing-anything`,
  `https://${HOST}/blog/is-online-clipboard-secure`,
  `https://${HOST}/blog/locked-clipboard-write-delegation`,
  `https://${HOST}/blog/online-clipboard-vs-cloud-notes`,
  `https://${HOST}/blog/online-clipboard-vs-desktop-apps`,
  `https://${HOST}/blog/online-clipboard-without-installing-anything-or-using-a-network-app`,
  `https://${HOST}/blog/phone-link-vs-syncclip`,
  `https://${HOST}/blog/pushbullet-alternatives-2026`,
  `https://${HOST}/blog/share-text-across-devices`,
  `https://${HOST}/blog/share-text-between-mobile-and-laptop-without-whatsapp`,
  `https://${HOST}/blog/stop-emailing-yourself-notes`,
  `https://${HOST}/blog/sync-clipboard-between-devices-without-same-wifi`,
  `https://${HOST}/blog/sync-clipboard-mac-windows`,
  `https://${HOST}/blog/syncclip-vs-universal-clipboard`,
  `https://${HOST}/blog/what-is-a-live-clipboard`,
  `https://${HOST}/blog/what-is-an-online-clipboard-complete-guide`,
  `https://${HOST}/blog/what-is-the-best-free-online-clipboard`,
  `https://${HOST}/blog/what-is-the-best-online-clipboard-that-syncs-automatically-in-real-time`,
];

const payload = JSON.stringify({
  host: HOST,
  key: KEY,
  keyLocation: KEY_LOCATION,
  urlList: urlList
});

const options = {
  hostname: 'api.indexnow.org',
  port: 443,
  path: '/indexnow',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': Buffer.byteLength(payload)
  }
};

console.log('Submitting URLs to IndexNow (Bing/Yandex)...');
console.log(`Host: ${HOST}`);
console.log(`Key Location: ${KEY_LOCATION}`);
console.log(`URLs to submit (${urlList.length}):`);
urlList.forEach(u => console.log(`   - ${u}`));

const req = https.request(options, (res) => {
  console.log(`\nIndexNow API Response Status: ${res.statusCode} ${res.statusMessage}`);

  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    if (res.statusCode === 200 || res.statusCode === 202) {
      console.log('IndexNow submission successful! Bing/Yandex will re-crawl these URLs shortly.');
    } else {
      console.error('IndexNow submission returned non-success status.');
      if (data) console.error(`Details: ${data}`);
    }
  });
});

req.on('error', (error) => {
  console.error('Error submitting to IndexNow:', error.message);
});

req.write(payload);
req.end();