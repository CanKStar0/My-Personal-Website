const puppeteer = require('puppeteer-core');
const path = require('path');

async function generatePDF() {
  const browserPath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const htmlPath = path.join(__dirname, 'proposal.html');
  const outputPath = 'C:\\Users\\canpo\\OneDrive\\Desktop\\AUTO_PROFIT_AI_Yazilim_Teklifi.pdf';

  const browser = await puppeteer.launch({
    executablePath: browserPath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--allow-file-access-from-files']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 1600, deviceScaleFactor: 2 });
  await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle0', timeout: 30000 });

  await page.pdf({
    path: outputPath,
    format: 'A4',
    printBackground: true,
    preferCSSPageSize: true,
    margin: {
      top: '0mm',
      bottom: '0mm',
      left: '0mm',
      right: '0mm'
    }
  });

  await browser.close();
  console.log('PDF başarıyla üretildi:', outputPath);
}

generatePDF().catch(err => {
  console.error('Hata oluştu:', err);
  process.exit(1);
});
