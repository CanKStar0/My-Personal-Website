const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'images');

async function capture() {
  console.log('Launching browser...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    ignoreHTTPSErrors: true,
    defaultViewport: { width: 1440, height: 900, deviceScaleFactor: 2 },
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.emulateMediaFeatures([{ name: 'prefers-color-scheme', value: 'dark' }]);

  // 1. Cover
  console.log('Navigating to homepage...');
  await page.goto('https://api.canpolatkaya.com', { waitUntil: 'domcontentloaded', timeout: 30000 });
  await new Promise(r => setTimeout(r, 4000));
  await page.screenshot({ path: path.join(OUTPUT_DIR, 'freeapi-cover.png') });
  console.log('Saved freeapi-cover.png');

  // 2. Terminal
  await page.evaluate(() => window.scrollTo(0, 300));
  await new Promise(r => setTimeout(r, 2000));
  await page.screenshot({ path: path.join(OUTPUT_DIR, 'freeapi-1.png') });
  console.log('Saved freeapi-1.png');

  // 3. Categories Grid
  await page.evaluate(() => window.scrollTo(0, 900));
  await new Promise(r => setTimeout(r, 2000));
  await page.screenshot({ path: path.join(OUTPUT_DIR, 'freeapi-2.png') });
  console.log('Saved freeapi-2.png');

  // 4. Category Weather Page
  console.log('Navigating to /category/weather...');
  await page.goto('https://api.canpolatkaya.com/category/weather', { waitUntil: 'domcontentloaded', timeout: 30000 });
  await new Promise(r => setTimeout(r, 4000));
  await page.screenshot({ path: path.join(OUTPUT_DIR, 'freeapi-3.png') });
  console.log('Saved freeapi-3.png');

  // 5. Submit Modal
  console.log('Navigating back for modal...');
  await page.goto('https://api.canpolatkaya.com', { waitUntil: 'domcontentloaded', timeout: 30000 });
  await new Promise(r => setTimeout(r, 3000));
  
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const submitBtn = buttons.find(b => b.textContent && (b.textContent.includes('API Öner') || b.textContent.includes('Submit API')));
    if (submitBtn) submitBtn.click();
  });
  await new Promise(r => setTimeout(r, 2000));
  await page.screenshot({ path: path.join(OUTPUT_DIR, 'freeapi-4.png') });
  console.log('Saved freeapi-4.png');

  await browser.close();
}

capture().catch(console.error);
