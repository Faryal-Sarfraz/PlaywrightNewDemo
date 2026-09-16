const { BasePage } = require('./BasePage');

class PIMPage extends BasePage {
  constructor(page) {
    super(page);
    this.addEmployeeLink = page.getByRole('link', { name: 'Add Employee' });
  }

  async clickAddEmployee() {
    await this.click(this.addEmployeeLink);
  }
}

module.exports = { PIMPage }; 
