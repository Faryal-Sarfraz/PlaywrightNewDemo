# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: leave.spec.js >> Leave Module Tests >> leave list returns 2 Taken records
- Location: tests\leave.spec.js:7:3

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: expect(locator).toContainText(expected) failed

Locator: getByText(/Records Found/)
Expected substring: "No Records Found"
Error: element(s) not found

Call log:
  - Expect "toContainText" with timeout 5000ms
  - waiting for getByText(/Records Found/)
  - Protocol error (Runtime.callFunctionOn): Internal server error, session closed.

```

```yaml
- complementary:
  - navigation "Sidepanel":
    - link "client brand banner":
      - /url: https://www.orangehrm.com/
      - img "client brand banner"
    - textbox "Search"
    - button ""
    - separator
    - list:
      - listitem:
        - link "Admin":
          - /url: /web/index.php/admin/viewAdminModule
      - listitem:
        - link "PIM":
          - /url: /web/index.php/pim/viewPimModule
      - listitem:
        - link "Leave":
          - /url: /web/index.php/leave/viewLeaveModule
      - listitem:
        - link "Time":
          - /url: /web/index.php/time/viewTimeModule
      - listitem:
        - link "Recruitment":
          - /url: /web/index.php/recruitment/viewRecruitmentModule
      - listitem:
        - link "My Info":
          - /url: /web/index.php/pim/viewMyDetails
      - listitem:
        - link "Performance":
          - /url: /web/index.php/performance/viewPerformanceModule
      - listitem:
        - link "Dashboard":
          - /url: /web/index.php/dashboard/index
      - listitem:
        - link "Directory":
          - /url: /web/index.php/directory/viewDirectory
      - listitem:
        - link "Maintenance":
          - /url: /web/index.php/maintenance/viewMaintenanceModule
      - listitem:
        - link "Claim":
          - /url: /web/index.php/claim/viewClaimModule
          - img
          - text: Claim
      - listitem:
        - link "Buzz":
          - /url: /web/index.php/buzz/viewBuzz
- banner:
  - heading "Leave" [level=6]
  - link "Upgrade":
    - /url: https://orangehrm.com/open-source/upgrade-to-advanced
    - button "Upgrade"
  - list:
    - listitem:
      - img "profile picture"
      - paragraph: Admin Admin
      - text: 
  - navigation "Topbar Menu":
    - list:
      - listitem:
        - link "Apply":
          - /url: "#"
      - listitem:
        - link "My Leave":
          - /url: "#"
      - listitem: Entitlements 
      - listitem: Reports 
      - listitem: Configure 
      - listitem:
        - link "Leave List":
          - /url: "#"
      - listitem:
        - link "Assign Leave":
          - /url: "#"
      - button ""
- heading "Leave List" [level=5]
- button ""
- separator
- text: From Date
- textbox "yyyy-dd-mm": 2026-01-01
- text:  To Date
- textbox "yyyy-dd-mm": 2026-31-12
- text:  Show Leave with Status* -- Select --  Taken  Leave Type -- Select --  Employee Name
- textbox "Type for hints..."
- text: Sub Unit -- Select -- 
- paragraph: Include Past Employees
- checkbox
- separator
- paragraph: "* Required"
- button "Reset"
- button "Search"
- text: (1) Record Found
- table:
  - rowgroup:
    - row " Date Employee Name Leave Type Leave Balance (Days) Number of Days Status Comments Actions":
      - columnheader "":
        - checkbox ""
        - text: 
      - columnheader "Date"
      - columnheader "Employee Name"
      - columnheader "Leave Type"
      - columnheader "Leave Balance (Days)"
      - columnheader "Number of Days"
      - columnheader "Status"
      - columnheader "Comments"
      - columnheader "Actions"
  - rowgroup:
    - row " 2026-02-09 to 2026-03-09 Admin Admin CAN - Personal 8.00 2.00 Pending Approval (2.00) test automation script 1 ":
      - cell "":
        - checkbox ""
        - text: 
      - cell "2026-02-09 to 2026-03-09"
      - cell "Admin Admin"
      - cell "CAN - Personal"
      - cell "8.00"
      - cell "2.00"
      - cell "Pending Approval (2.00)"
      - cell "test automation script 1"
      - cell "":
        - listitem:
          - button ""
- paragraph: OrangeHRM OS 5.9
- paragraph:
  - text: © 2005 - 2026
  - link "OrangeHRM, Inc":
    - /url: http://www.orangehrm.com
  - text: . All rights reserved.
```

# Test source

```ts
  1  | const { test, expect } = require('../fixtures');
  2  | const { DashboardPage } = require('../pages/DashboardPage');
  3  | const { LeavePage } = require('../pages/LeavePage');
  4  | const { allure } = require('allure-playwright');
  5  | 
  6  | test.describe('Leave Module Tests', () => {
  7  |   test('leave list returns 2 Taken records', async ({ page, loginPage }) => {
  8  |     const dashboardPage = new DashboardPage(page);
  9  |     const leavePage = new LeavePage(page);
  10 | 
  11 |     allure.epic('Leave Module');
  12 |     allure.feature('Leave List');
  13 |     allure.story('Taken Leave Search');
  14 |     allure.description('This test verifies that the leave list returns 2 Taken records when searched.');
  15 |     allure.severity('critical');
  16 | 
  17 |     await test.step('Log in and navigate to Leave list', async () => {
  18 |       await loginPage.login();
  19 |       await dashboardPage.clickLeaveMenu();
  20 |     });
  21 | 
  22 |     await test.step('Search for Taken leaves', async () => {
  23 |       await leavePage.selectTakenLeaves();
  24 |       await leavePage.clickSearch();
  25 |       await page.waitForTimeout(5000);
> 26 |       await expect(leavePage.recordsFound).toContainText('No Records Found');
     |                                            ^ Error: expect(locator).toContainText(expected) failed
  27 |       const searchScreenshot = await page.screenshot({ fullPage: true });
  28 |       allure.attachment('Leave search screenshot', searchScreenshot, 'image/png');
  29 |     });
  30 |   });
  31 | });
```