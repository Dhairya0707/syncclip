const https = require('https');

const HOST = 'syncclip.in';
const KEY = 'c9f8e7d6b5a43210fdecba9876543210';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;

const urlList = [
  `https://${HOST}/clipboard-sync-guide`,
  `https://${HOST}/clipboard`,
  `https://${HOST}/blog/go-online-tools-clipboard-alternative`,
  `https://${HOST}/blog/what-is-the-best-free-online-clipboard`,
  `https://${HOST}/blog/pushbullet-alternatives-2026`,
  `https://${HOST}/blog/how-to-sync-clipboard-without-installing-anything`,
  `https://${HOST}/blog/how-to-share-clipboard-between-android-and-windows-pc`,
  `https://${HOST}/blog/is-online-clipboard-secure`,
  `https://${HOST}/blog/how-to-copy-and-paste-online-between-two-devices-using-a-link`,
  `https://${HOST}/blog/what-is-the-best-online-clipboard-that-syncs-automatically-in-real-time`,
  `https://${HOST}/pushbullet-alternative`,
  `https://${HOST}/`
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

console.log('🚀 Submitting URLs to IndexNow (Bing/Yandex)...');
console.log(`📦 Host: ${HOST}`);
console.log(`🔑 Key Location: ${KEY_LOCATION}`);
console.log(`🔗 URLs to submit (${urlList.length}):`);
urlList.forEach(u => console.log(`   - ${u}`));

const req = https.request(options, (res) => {
  console.log(`\n📡 IndexNow API Response Status: ${res.statusCode} ${res.statusMessage}`);
  
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    if (res.statusCode === 200 || res.statusCode === 202) {
      console.log('✅ IndexNow submission successful! Bing/Yandex will re-crawl these URLs shortly.');
    } else {
      console.error('❌ IndexNow submission returned non-success status.');
      if (data) console.error(`ℹ️ Details: ${data}`);
    }
  });
});

req.on('error', (error) => {
  console.error('❌ Error submitting to IndexNow:', error.message);
});

req.write(payload);
req.end();
