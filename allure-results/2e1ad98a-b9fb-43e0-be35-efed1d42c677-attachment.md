# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: login.spec.js >> Login Module >> login test
- Location: tests\login.spec.js:16:3

# Error details

```
Test timeout of 30000ms exceeded while running "beforeEach" hook.
```

# Test source

```ts
  1  | const { test, expect } = require('@playwright/test');
  2  | const { LoginPage } = require('../pages/LoginPage');
  3  | const { DashboardPage } = require('../pages/DashboardPage');
  4  | const { allure } = require('allure-playwright');
  5  | 
  6  | test.describe('Login Module', () => {
  7  |   let loginPage;
  8  |   let dashboardPage;
  9  | 
> 10 |   test.beforeEach(async ({ page }) => {
     |        ^ Test timeout of 30000ms exceeded while running "beforeEach" hook.
  11 |     loginPage = new LoginPage(page);
  12 |     dashboardPage = new DashboardPage(page);
  13 |     await loginPage.navigate();
  14 |   });
  15 | 
  16 |   test('login test', async ({ page }) => {
  17 |     allure.epic('Login Tests');
  18 |     allure.feature('Login Feature');
  19 |     allure.story('Valid Login Test');
  20 |     allure.description('This test verifies that a user can log in with valid credentials and access the dashboard.');
  21 |     allure.severity('critical');
  22 |     allure.tag('smoke');
  23 | 
  24 |     await test.step('Perform login using env credentials', async () => {
  25 |       await loginPage.login();
  26 |       const loginScreenshot = await page.screenshot();
  27 |       allure.attachment('Login page screenshot', loginScreenshot, 'image/png');
  28 |     });
  29 | 
  30 |     await test.step('Verify dashboard heading', async () => {
  31 |       const dashboardHeader = await dashboardPage.getDashboardHeaderText();
  32 |       const dashboardScreenshot = await page.screenshot();
  33 |       allure.attachment('Dashboard page screenshot', dashboardScreenshot, 'image/png');
  34 |       expect(dashboardHeader.trim()).toBe('Dashboard');
  35 |     });
  36 |   });
  37 | 
  38 |   test('Invalid login test', async ({ page }) => {
  39 |     await test.step('Attempt login with invalid credentials', async () => {
  40 |       await loginPage.login('Admin', 'wrongpassword');
  41 |       const invalidLoginScreenshot = await page.screenshot();
  42 |       allure.attachment('Invalid login attempt screenshot', invalidLoginScreenshot, 'image/png');
  43 |     });
  44 | 
  45 |     await test.step('Verify invalid credentials error message', async () => {
  46 |       const errorMessage = await loginPage.getErrorMessage();
  47 |       expect(errorMessage).toBe('Invalid credentials');
  48 |     });
  49 |   });
  50 | });
```