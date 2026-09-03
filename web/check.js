import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => {
    if (msg.text().includes('AXIOS')) {
       console.log(msg.text());
    }
  });

  console.log('Navigating to http://localhost:5174/login...');
  await page.goto('http://localhost:5174/login', { waitUntil: 'networkidle2' });
  
  console.log('Observing for 15 seconds...');
  await new Promise(r => setTimeout(r, 15000));
  
  await browser.close();
  console.log('Done.');
})();
