class LeavePage {
  constructor(page) {
    this.page = page;
    this.leaveDropdown = page.locator('form i').nth(2);
    this.pendingApprovalClear = page.locator('span').filter({ hasText: 'Pending Approval' }).locator('i');
    this.takenOption = page.getByText('Taken');
    this.searchButton = page.getByRole('button', { name: 'Search' });
    this.recordsFound = page.getByText(/Records Found/);
  }

  async selectTakenLeaves() {
    await this.pendingApprovalClear.click();
    await this.leaveDropdown.click();
    await this.takenOption.click();
  }

  async clickSearch() {
    await this.searchButton.click();
  }

  async hasRecordsFound(count) {
    return await this.recordsFound.locator(`text=${count} Records Found`).isVisible();
  }
}

module.exports = { LeavePage };