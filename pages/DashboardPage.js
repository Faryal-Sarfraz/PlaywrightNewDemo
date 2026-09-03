const { BasePage } = require('./BasePage');

class DashboardPage extends BasePage {
  constructor(page) {
    super(page);
    this.profileMenu = page.getByRole('img', { name: 'Profile picture' });
    this.dashboardHeader = page.getByRole('heading', { name: 'Dashboard' });
    this.searchInput = page.getByRole('textbox', { name: 'Search' });
    this.sidepanelLabel = page.getByLabel('Sidepanel').locator('span');
    this.leaveLink = page.getByRole('link', { name: 'Leave' });
  }

  async getDashboardHeaderText() {
    return await this.getText(this.dashboardHeader);
  }

  async openProfileMenu() {
    await this.click(this.profileMenu);
  }

  async search(term) {
    await this.fill(this.searchInput, term);
  }

  async getSidepanelLabelText() {
    return await this.getText(this.sidepanelLabel);
  }

  async isLeaveMenuVisible() {
    return await this.sidepanelLabel.isVisible();
  }

  async clickLeaveMenu() {
    await this.leaveLink.waitFor({ state: 'visible' });
    await this.click(this.leaveLink);
  }
}

module.exports = { DashboardPage };