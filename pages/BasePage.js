class BasePage {

  constructor(page) {
    this.page = page;
    this.username = process.env.APP_USERNAME;
    this.password = process.env.PASSWORD;
  }

  async navigate(path = '') {
    const baseUrl = process.env.BASE_URL || 'https://opensource-demo.orangehrmlive.com/';
    await this.page.goto(`${baseUrl}${path}`);

  }

  async waitForPageLoad() {
    await this.page.waitForLoadState('domcontentloaded');
  }

  async click(locator) {
    await locator.click();
  }

  async fill(locator, value) {
    await locator.fill(value);
  }

  async getText(locator) {
    return await locator.textContent();
  }
}

module.exports = { BasePage };