class BasePage {
  constructor(page) {
    this.page = page;
    this.username = process.env.APP_USERNAME || '';
    this.password = process.env.PASSWORD || '';
  }

  _resolveLocator(locator) {
    if (!locator) {
      throw new Error('A locator was not provided.');
    }

    if (typeof locator === 'string') {
      return this.page.locator(locator);
    }

    if (locator && typeof locator.locator === 'function') {
      return locator;
    }

    throw new Error(`Unsupported locator type: ${typeof locator}`);
  }

  async navigate(path = '') {
    const baseUrl = process.env.BASE_URL || 'https://opensource-demo.orangehrmlive.com/';
    await this.page.goto(`${baseUrl}${path}`);
  }

  async waitForPageLoad() {
    await this.page.waitForLoadState('domcontentloaded');
  }

  async click(locator) {
    const resolvedLocator = this._resolveLocator(locator);

    try {
      await resolvedLocator.waitFor({ state: 'visible', timeout: 10000 });
      await resolvedLocator.click();
    } catch (error) {
      throw new Error(`Failed to click element: ${error.message}`);
    }
  }

  async fill(locator, value) {
    if (value === undefined || value === null || String(value).trim() === '') {
      throw new Error('Cannot fill an element with an empty value.');
    }

    const resolvedLocator = this._resolveLocator(locator);

    try {
      await resolvedLocator.waitFor({ state: 'visible', timeout: 10000 });
      await resolvedLocator.fill(String(value));
    } catch (error) {
      throw new Error(`Failed to fill element with value: ${error.message}`);
    }
  }

  async getText(locator) {
    const resolvedLocator = this._resolveLocator(locator);

    try {
      await resolvedLocator.waitFor({ state: 'visible', timeout: 10000 });
      return (await resolvedLocator.textContent())?.trim() ?? '';
    } catch (error) {
      throw new Error(`Failed to get text from element: ${error.message}`);
    }
  }
}

module.exports = { BasePage };