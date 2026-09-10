const { BasePage } = require('./BasePage');

class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.usernameInput = this.page.getByRole('textbox', { name: /username/i });
    this.passwordInput = this.page.getByRole('textbox', { name: /password/i });
    this.loginButton = this.page.getByRole('button', { name: /login/i });
    this.errorMessage = this.page.getByText(/invalid credentials/i);
  }

  validateCredentials(username, password) {
    if (!username || !String(username).trim()) {
      throw new Error('Missing APP_USERNAME. Set the repository secret APP_USERNAME before running Playwright tests.');
    }

    if (!password || !String(password).trim()) {
      throw new Error('Missing PASSWORD. Set the repository secret PASSWORD before running Playwright tests.');
    }
  }

  async login(username = this.username, password = this.password) {
    this.validateCredentials(username, password);
    await this.fill(this.usernameInput, username);
    await this.fill(this.passwordInput, password);
    await this.click(this.loginButton);
  }

  async getErrorMessage() {
    return await this.getText(this.errorMessage);
  }
}

module.exports = { LoginPage };