const { BasePage } = require('./BasePage');

class LeavePage extends BasePage {
  constructor(page) {
    super(page);
    this.leaveDropdown = page.locator('form i').nth(2);
    this.pendingApprovalClear = page.locator('span').filter({ hasText: 'Pending Approval' }).locator('i');
    this.takenOption = page.getByText('Taken');
    this.searchButton = page.getByRole('button', { name: 'Search' });
    this.recordsFound = page.locator('span').filter({ hasText: 'No Records Found' });
  }

  async selectTakenLeaves() {
    await this.click(this.pendingApprovalClear);
    await this.click(this.leaveDropdown);
    await this.click(this.takenOption);
  }

  async clickSearch() {
    await this.click(this.searchButton);
  }

  async hasRecordsFound(expectedText) {
    return await this.recordsFound.filter({ hasText: expectedText }).isVisible();
  }
}

module.exports = { LeavePage };