const { test, expect } = require('../fixtures');
const { DashboardPage } = require('../pages/DashboardPage');
const { allure } = require('allure-playwright');

test.describe('dashboard Tests', () => {
  test('dashboard search verifies Leave menu exists', async ({ page, loginPage }) => {
    const dashboardPage = new DashboardPage(page);

    allure.epic('Dashboard Tests');
    allure.feature('Dashboard Search');
    allure.story('Search and Leave Menu Verification');
    allure.description('Verify that the search functionality works correctly and the Leave menu is visible');
    allure.severity('critical');

    await test.step('Perform login using env credentials', async () => {
      await loginPage.login();
    });

    await test.step('Search for "Leave" in the dashboard search input', async () => {
      await dashboardPage.search('Leave');
      await expect(dashboardPage.sidepanelLabel).toContainText('Leave');
      expect(await dashboardPage.isLeaveMenuVisible()).toBe(true);
      const searchScreenshot = await page.screenshot({ fullPage: true });
      allure.attachment('Dashboard search screenshot', searchScreenshot, 'image/png');
    });
  });
});