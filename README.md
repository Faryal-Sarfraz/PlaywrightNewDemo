# Playwright Automation Framework

This project is a Playwright-based UI automation suite for OrangeHRM, built with a Page Object Model (POM), reusable fixtures, and CI-safe credential handling.

## Overview

The framework includes:

- Playwright test runner with Chromium project setup
- Shared page objects for Login, Dashboard, Leave, PIM, and Add Employee flows
- Reusable fixtures for authenticated access
- Environment-based configuration through `.env`
- CI validation for required secrets before running tests
- Allure reporting for test results
- Dynamic test data generation using Faker.js for employee creation scenarios

## Tech Stack

- Playwright
- JavaScript
- Node.js
- dotenv
- Faker.js
- Allure Playwright

## Project Structure

```text
PlaywrightNewDemo/
├── .github/
│   └── workflows/
│       └── playwright.yml
├── fixtures/
│   └── index.js
├── pages/
│   ├── BasePage.js
│   ├── LoginPage.js
│   ├── DashboardPage.js
│   ├── LeavePage.js
│   ├── PIMPage.js
│   └── AddEmployeePage.js
├── tests/
│   ├── login.spec.js
│   ├── dashboard.spec.js
│   ├── leave.spec.js
│   └── addEmployee.spec.js
├── .env
├── playwright.config.js
├── package.json
├── README.md
├── playwright-report/
├── test-results/
└── allure-results/
```

## Prerequisites

Make sure the following are installed:

- Node.js
- npm

## Installation

```bash
npm install
```

## Environment Configuration

Create a `.env` file in the project root with the required values:

```env
BASE_URL=https://opensource-demo.orangehrmlive.com/
APP_USERNAME=Admin
PASSWORD=admin123
```

### Notes

- `APP_USERNAME` is used for the OrangeHRM username.
- `PASSWORD` is used for the OrangeHRM password.
- These values are read by the page objects and are validated before login is attempted.

## Run Tests

Run the full suite:

```bash
npx playwright test
```

Run tests in headed mode:

```bash
npx playwright test --headed
```

Run a single file:

```bash
npx playwright test tests/login.spec.js
```

## Useful Scripts

```bash
npm test
npm run allure:generate
npm run allure:open
npm run allure:serve
npm install @faker-js/faker
```

Faker is used in the employee creation flow to generate realistic names dynamically instead of hardcoded values.

## Allure Reporting

Generate HTML report output:

```bash
npx allure generate allure-results --clean -o allure-report
```

Open the generated report:

```bash
npx allure open allure-report
```

Serve the report directly:

```bash
npx allure serve allure-results
```

## CI and Secrets

The GitHub Actions workflow checks for required secrets before the Playwright run starts.

Required repository secrets:

- `APP_USERNAME`
- `PASSWORD`

The workflow fails early with a clear error if either secret is missing, instead of letting Playwright fail later with undefined credential errors.

## Page Object Pattern

The framework uses a shared `BasePage` to centralize common actions such as:

- navigation
- click handling
- fill handling
- text retrieval
- locator validation

`LoginPage` extends `BasePage` and validates credentials before attempting login. This prevents undefined values from being passed into Playwright locators and keeps the test code cleaner and safer.

## Current Coverage

The suite currently validates:

- valid login flow
- invalid login flow
- dashboard search and navigation
- leave list filtering/search behavior
- PIM navigation
- employee creation using generated Faker data

## Dynamic Test Data

The add-employee scenario uses `@faker-js/faker` to create random first and last names before submitting the OrangeHRM form. This avoids hardcoded values and helps keep tests reusable and realistic.

Example:

```javascript
const { faker } = require('@faker-js/faker');

const firstName = faker.person.firstName();
const lastName = faker.person.lastName();
const fullName = `${firstName} ${lastName}`;
```

## Notes

This project is designed to be easy to extend with more page objects, custom fixtures, and additional end-to-end scenarios as the application grows.
