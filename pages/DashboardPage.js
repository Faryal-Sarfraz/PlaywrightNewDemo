class DashboardPage {
  constructor(page) {
    this.page = page;
    this.profileMenu = page.getByRole('img', { name: 'Profile picture' });
    this.dashboardHeader = page.getByRole('heading', { name: 'Dashboard' });
    this.searchInput = page.getByRole('textbox', { name: 'Search' });
    this.sidepanelLabel = page.getByLabel('Sidepanel').locator('span');
    this.leaveLink = page.getByRole('link', { name: 'Leave' });
  }

  async getDashboardHeaderText() {
    return await this.dashboardHeader.textContent();
  }

  async openProfileMenu() {
    await this.profileMenu.click();
  }

  async search(term) {
    await this.searchInput.fill(term);
  }

  async getSidepanelLabelText() {
    return await this.sidepanelLabel.textContent();
  }

  async isLeaveMenuVisible() {
    return await this.sidepanelLabel.isVisible();
  }

  async clickLeaveMenu() {
    await this.leaveLink.waitFor({ state: 'visible' });
    await this.leaveLink.click();
  }
}

module.exports = { DashboardPage };