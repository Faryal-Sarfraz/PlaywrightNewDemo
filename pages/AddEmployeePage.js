const { expect } = require('@playwright/test');
const { BasePage } = require('./BasePage');

class AddEmployeePage extends BasePage {
  constructor(page) {
    super(page);
    this.firstNameInput = page.getByRole('textbox', { name: 'First Name' });
    this.middleNameInput = page.getByRole('textbox', { name: 'Middle Name' });
    this.lastNameInput = page.getByRole('textbox', { name: 'Last Name' });
    this.employeeIdInput = page.getByRole('textbox').nth(4);
    this.saveButton = page.getByRole('button', { name: 'Save' });
    this.layoutContext = page.locator('.oxd-layout-context');
    this.appRoot = page.locator('#app');
  }

  async fillEmployeeDetails(firstName, middleName, lastName) {
    await this.click(this.firstNameInput);
    await this.fill(this.firstNameInput, firstName);

    await this.click(this.middleNameInput);
    await this.fill(this.middleNameInput, middleName);

    await this.click(this.lastNameInput);
    await this.fill(this.lastNameInput, lastName);
  }

  async saveEmployee() {
    await this.click(this.saveButton);
  }

  async waitForCreatedEmployeeName(fullName) {
    const employeeHeader = this.page.getByRole('heading', {
      name: new RegExp(fullName, 'i')
    });
    await employeeHeader.waitFor({ state: 'visible' });
  }

  async expectEmployeeVisible(fullName) {
    await expect(this.appRoot).toContainText(fullName);
  }

  async clickLayoutContext() {
    await this.click(this.layoutContext);
  }
}

module.exports = { AddEmployeePage }; 
