const { test, expect } = require('../fixtures');
const { faker } = require('@faker-js/faker');
const { DashboardPage } = require('../pages/DashboardPage');
const { PIMPage } = require('../pages/PIMPage');
const { AddEmployeePage } = require('../pages/AddEmployeePage');

test.describe('PIM Module Tests', () => {
  test('add employee with valid details', async ({ page, loginPage }) => {
    const dashboardPage = new DashboardPage(page);
    const pimPage = new PIMPage(page);
    const addEmployeePage = new AddEmployeePage(page);

    const firstName = faker.person.firstName();
    const middleName = faker.person.middleName();
    const lastName = faker.person.lastName();
    const fullName = `${firstName} ${lastName}`;

    await test.step('Login and open PIM module', async () => {
      await loginPage.login();
      await dashboardPage.clickPimMenu();
    });

    await test.step('Open Add Employee page', async () => {
      await pimPage.clickAddEmployee();
    });

    await test.step('Fill employee details and save', async () => {
      await addEmployeePage.fillEmployeeDetails(firstName, middleName, lastName);
      await addEmployeePage.saveEmployee();
      await addEmployeePage.waitForCreatedEmployeeName(fullName);
      await addEmployeePage.clickLayoutContext();

      await page.screenshot({ fullPage: true });
    });
  });
});
