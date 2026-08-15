const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/loginPage');

test.describe('Login Tests', () => {

test('login test', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login('Admin', 'admin123');
});

test('Invalid login test', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login('Admin', 'wrongpassword');
});
});