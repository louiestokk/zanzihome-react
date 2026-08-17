const puppeteer = require('puppeteer');

(async () => {
  console.log('Launching browser...');
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();

  page.on('console', msg => {
    console.log(`[CONSOLE ${msg.type().toUpperCase()}]:`, msg.text());
  });

  page.on('pageerror', err => {
    console.error('[PAGE ERROR]:', err.message);
    if (err.stack) console.error(err.stack);
  });

  page.on('requestfailed', request => {
    console.log('[REQUEST FAILED]:', request.url(), request.failure().errorText);
  });

  console.log('Navigating to http://localhost:3001/ ...');
  try {
    await page.goto('http://localhost:3001/', { waitUntil: 'load', timeout: 30000 });
    console.log('Page loaded. Waiting 5 seconds...');
    await new Promise(resolve => setTimeout(resolve, 5000));
  } catch (err) {
    console.error('Error during navigation:', err.message);
  }

  await browser.close();
  console.log('Browser closed.');
})();
