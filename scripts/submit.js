const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  const problemSlug = 'add-two-numbers';
  const solutionPath = path.resolve('solutions', `${problemSlug}.cpp`);
  const code = fs.readFileSync(solutionPath, 'utf8');

  // Login
  await page.goto('https://leetcode.com/accounts/login/');
  await page.fill('input[name="login"]', process.env.LEETCODE_USERNAME);
  await page.fill('input[name="password"]', process.env.LEETCODE_PASSWORD);
  await page.click('button[type="submit"]');
  await page.waitForNavigation();

  // Go to problem page
  await page.goto(`https://leetcode.com/problems/${problemSlug}/`);

  // Wait for Code tab and switch to C++
  await page.click('text=Code');
  await page.click('.ant-select-selector'); // Language dropdown
  await page.click('text=C++'); // Select C++

  // Fill editor
  await page.evaluate(code => {
    const editor = window.monaco.editor.getModels()[0];
    editor.setValue(code);
  }, code);

  // Submit
  await page.click('button:has-text("Submit")');
  console.log('✅ Submitted code for:', problemSlug);

  await page.waitForTimeout(8000); // Wait for verdict
  await browser.close();
})();
