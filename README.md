# Playwright Automation Framework

This project is a Playwright-based UI automation framework for validating the OrangeHRM login flow and dashboard access.

## Overview

The framework follows a Page Object Model (POM) design pattern to keep locators and user actions separated from the test logic. It includes:

- Playwright test runner setup
- Page objects for login and dashboard pages
- Environment-based configuration using `.env`
- Allure reporting integration
- Browser automation for Chromium

## Tech Stack

- Playwright
- JavaScript
- Node.js
- dotenv
- Allure Report

## Project Structure

```text
PlaywrightNewDemo/
├── pages/
│   ├── BasePage.js
│   ├── LoginPage.js
│   └── DashboardPage.js
├── tests/
│   └── login.spec.js
├── .env
├── playwright.config.js
├── package.json
├── package-lock.json
├── README.md
└── playwright-report/
```

## Prerequisites

Make sure you have the following installed:

- Node.js
- npm

## Installation

```bash
npm install
```

## Environment Configuration

Create a `.env` file in the project root with the following values:

```env
BASE_URL=https://opensource-demo.orangehrmlive.com/
USERNAME=Admin
PASSWORD=admin123
```

## Run Tests

Run the full test suite:

```bash
npx playwright test
```

Run tests in headed mode:

```bash
npx playwright test --headed
```

## Useful Scripts

```bash
npm test
```

## Allure Reporting

Generate and view the Allure report:

```bash
npm run allure:generate
npm run allure:open
```

You can also serve the report directly:

```bash
npm run allure:serve
```

## Current Test Coverage

The framework currently validates:

- valid login flow
- invalid login validation message
- dashboard visibility after successful login

## Notes

This project is designed to be easy to extend with additional page objects and test scenarios as the application grows.
