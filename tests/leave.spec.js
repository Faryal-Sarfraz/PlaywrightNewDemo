const { test, expect } = require('../fixtures');
const { DashboardPage } = require('../pages/DashboardPage');
const { LeavePage } = require('../pages/LeavePage');
const { allure } = require('allure-playwright');

test.describe('Leave Module Tests', () => {
  test('leave list returns no Taken records', async ({ page, loginPage }) => {
    const dashboardPage = new DashboardPage(page);
    const leavePage = new LeavePage(page);

    allure.epic('Leave Module');
    allure.feature('Leave List');
    allure.story('Taken Leave Search');
    allure.description('This test verifies that no Taken leave records are returned when searched.');
    allure.severity('critical');

    await test.step('Log in and navigate to Leave list', async () => {
      await loginPage.login();
      await dashboardPage.clickLeaveMenu();
    });

    await test.step('Search for Taken leaves', async () => {
      await leavePage.selectTakenLeaves();
      await leavePage.clickSearch();

      await expect(leavePage.recordsFound).toContainText('No Records Found');
      const searchScreenshot = await page.screenshot({ fullPage: true });
      allure.attachment('Leave search screenshot', searchScreenshot, 'image/png');
    });
  });
});