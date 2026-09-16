# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: login.spec.js >> Login Module >> Invalid login test
- Location: tests\login.spec.js:38:3

# Error details

```
Test timeout of 30000ms exceeded while running "beforeEach" hook.
```

```
Error: page.goto: Test timeout of 30000ms exceeded.
Call log:
  - navigating to "https://opensource-demo.orangehrmlive.com/", waiting until "load"

```

# Test source

```ts
  1  | class BasePage {
  2  | 
  3  |   constructor(page) {
  4  |     this.page = page;
  5  |     this.username = process.env.APP_USERNAME;
  6  |     this.password = process.env.PASSWORD;
  7  |   }
  8  | 
  9  |   async navigate(path = '') {
  10 |     const baseUrl = process.env.BASE_URL || 'https://opensource-demo.orangehrmlive.com/';
> 11 |     await this.page.goto(`${baseUrl}${path}`);
     |                     ^ Error: page.goto: Test timeout of 30000ms exceeded.
  12 | 
  13 |   }
  14 | 
  15 |   async waitForPageLoad() {
  16 |     await this.page.waitForLoadState('domcontentloaded');
  17 |   }
  18 | 
  19 |   async click(locator) {
  20 |     await locator.click();
  21 |   }
  22 | 
  23 |   async fill(locator, value) {
  24 |     await locator.fill(value);
  25 |   }
  26 | 
  27 |   async getText(locator) {
  28 |     return await locator.textContent();
  29 |   }
  30 | }
  31 | 
  32 | module.exports = { BasePage };
```