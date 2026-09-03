import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  page.on('console', msg => {
    console.log(`[BROWSER CONSOLE] ${msg.type().toUpperCase()}: ${msg.text()}`);
  });

  console.log("Navigating to signup...");
  await page.goto('http://localhost:5173/signup');
  
  await page.waitForTimeout(1000); // Wait for React to load
  
  console.log("Filling form...");
  await page.fill('input[type="text"]', 'Playwright User');
  await page.fill('input[type="email"]', `playwright-${Date.now()}@example.com`);
  await page.fill('input[type="password"]', 'Password123!');
  
  console.log("Submitting...");
  await page.click('button[type="submit"]');

  console.log("Waiting for network idle...");
  await page.waitForTimeout(3000);
  
  const currentUrl = page.url();
  console.log("Current URL:", currentUrl);
  
  const hasSession = await page.evaluate(() => localStorage.getItem('hasSession'));
  const accessToken = await page.evaluate(() => localStorage.getItem('accessToken'));
  console.log("hasSession:", hasSession);
  console.log("accessToken exists:", !!accessToken && accessToken !== 'undefined');
  
  if (currentUrl.includes('/dashboard')) {
     console.log("Successfully navigated to Dashboard!");
  } else {
     console.log("Failed to navigate to Dashboard.");
  }

  await browser.close();
})();
