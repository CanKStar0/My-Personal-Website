const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'images');

async function capture() {
  console.log('Launching browser with realistic human headers...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    ignoreHTTPSErrors: true,
    defaultViewport: { width: 1440, height: 900, deviceScaleFactor: 2 },
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-blink-features=AutomationControlled',
      '--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'
    ]
  });

  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36');
  await page.emulateMediaFeatures([{ name: 'prefers-color-scheme', value: 'dark' }]);

  // 1. Cover (Hero & Sandbox)
  console.log('1. Navigating to homepage...');
  await page.goto('https://api.canpolatkaya.com', { waitUntil: 'networkidle2', timeout: 30000 });
  await new Promise(r => setTimeout(r, 3000));
  await page.screenshot({ path: path.join(OUTPUT_DIR, 'freeapi-cover.png') });
  console.log('Saved freeapi-cover.png');

  // 2. Feature 1: Terminal Sandbox Focus
  console.log('2. Capturing Terminal Playground...');
  await page.evaluate(() => window.scrollTo(0, 420));
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({ path: path.join(OUTPUT_DIR, 'freeapi-1.png') });
  console.log('Saved freeapi-1.png');

  // 3. Feature 2: 46 Categories Explorer
  console.log('3. Scrolling to Categories Explorer...');
  await page.evaluate(() => window.scrollTo(0, 1100));
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({ path: path.join(OUTPUT_DIR, 'freeapi-2.png') });
  console.log('Saved freeapi-2.png');

  // 4. Feature 3: Category Detail Page with Live APIs
  console.log('4. Navigating to /category/weather...');
  await page.goto('https://api.canpolatkaya.com/category/weather', { waitUntil: 'networkidle2', timeout: 30000 });
  await new Promise(r => setTimeout(r, 3000));
  await page.screenshot({ path: path.join(OUTPUT_DIR, 'freeapi-3.png') });
  console.log('Saved freeapi-3.png');

  // 5. Feature 4: Community Submit Modal
  console.log('5. Navigating back and opening Submit Modal...');
  await page.goto('https://api.canpolatkaya.com', { waitUntil: 'networkidle2', timeout: 30000 });
  await new Promise(r => setTimeout(r, 2000));
  
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const submitBtn = btns.find(b => b.textContent && (b.textContent.includes('API Öner') || b.textContent.includes('Submit API')));
    if (submitBtn) submitBtn.click();
  });
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({ path: path.join(OUTPUT_DIR, 'freeapi-4.png') });
  console.log('Saved freeapi-4.png');

  await browser.close();
  console.log('All real UI screenshots captured successfully!');
}

capture().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
