const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { DashboardPage } = require('../pages/DashboardPage');
const { allure } = require('allure-playwright');

test.describe('Login Module', () => {
  let loginPage;
  let dashboardPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);
    await loginPage.navigate();
  });

  test('login test', async ({ page }) => {
    allure.epic('Login Tests');
    allure.feature('Login Feature');
    allure.story('Valid Login Test');
    allure.description('This test verifies that a user can log in with valid credentials and access the dashboard.');
    allure.severity('critical');
    allure.tag('smoke');

    await test.step('Perform login using env credentials', async () => {
      await loginPage.login();
      const loginScreenshot = await page.screenshot();
      allure.attachment('Login page screenshot', loginScreenshot, 'image/png');
    });

    await test.step('Verify dashboard heading', async () => {
      const dashboardHeader = await dashboardPage.getDashboardHeaderText();
      const dashboardScreenshot = await page.screenshot();
      allure.attachment('Dashboard page screenshot', dashboardScreenshot, 'image/png');
      expect(dashboardHeader.trim()).toBe('Dashboard');
    });
  });

  test('Invalid login test', async ({ page }) => {
    await test.step('Attempt login with invalid credentials', async () => {
      await loginPage.login('Admin', 'wrongpassword');
      const invalidLoginScreenshot = await page.screenshot();
      allure.attachment('Invalid login attempt screenshot', invalidLoginScreenshot, 'image/png');
    });

    await test.step('Verify invalid credentials error message', async () => {
      const errorMessage = await loginPage.getErrorMessage();
      expect(errorMessage).toBe('Invalid credentials');
    });
  });
});