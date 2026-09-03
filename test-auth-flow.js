const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  page.on('console', msg => {
    console.log(`[BROWSER CONSOLE] ${msg.type().toUpperCase()}: ${msg.text()}`);
  });

  console.log("Navigating to login...");
  await page.goto('http://localhost:5173/login');
  
  console.log("Filling form...");
  await page.fill('input[type="email"]', 'debug@example.com');
  await page.fill('input[type="password"]', 'Password123!');
  
  console.log("Submitting...");
  await page.click('button[type="submit"]');

  console.log("Waiting for network idle...");
  await page.waitForTimeout(3000);
  
  console.log("Current URL:", page.url());
  await browser.close();
})();
