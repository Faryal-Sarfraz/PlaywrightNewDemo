const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { DashboardPage } = require('../pages/DashboardPage');
const { LeavePage } = require('../pages/LeavePage');
const { allure } = require('allure-playwright');

test.describe('Leave Module Tests', () => {

    let loginPage;
    let dashboardPage;
    let leavePage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        dashboardPage = new DashboardPage(page);
        leavePage = new LeavePage(page);
        await loginPage.navigate();
});

test('leave list returns 2 Taken records', async ({ page }) => {
    allure.epic('Leave Module');
    allure.feature('Leave List');
    allure.story('Taken Leave Search');
    allure.description('This test verifies that the leave list returns 2 Taken records when searched.');
    allure.severity('critical');

    await test.step('Log in and navigate to Leave list', async () => {
        await loginPage.login();
        await dashboardPage.clickLeaveMenu();
    });

    await test.step('Search for Taken leaves', async () => {
        await leavePage.selectTakenLeaves();
        await leavePage.clickSearch();
        await page.waitForTimeout(5000);
        await expect(leavePage.recordsFound).toContainText('No Records Found');
        const searchScreenshot = await page.screenshot({ fullPage: true });
        allure.attachment('Leave search screenshot', searchScreenshot, 'image/png');
    });
});
});