# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: leave.spec.js >> Leave Module Tests >> leave list returns 2 Taken records
- Location: tests\leave.spec.js:20:1

# Error details

```
TypeError: this.pendingApprovalClear.click is not a function
```

```
Error: locator.click: Test ended.
Call log:
  - waiting for locator('span').filter({ hasText: 'Pending Approval' }).locator('i')
    - waiting for "https://opensource-demo.orangehrmlive.com/web/index.php/auth/validate" navigation to finish...
    - navigated to "https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index"
    - waiting for "https://opensource-demo.orangehrmlive.com/web/index.php/leave/viewLeaveModule" navigation to finish...
    - navigated to "https://opensource-demo.orangehrmlive.com/web/index.php/leave/viewLeaveList"

```

# Test source

```ts
  1  | class LeavePage {
  2  |   constructor(page) {
  3  |     this.page = page;
  4  |     this.leaveDropdown = page.locator('form i').nth(2);
> 5  |     this.pendingApprovalClear = page.locator('span').filter({ hasText: 'Pending Approval' }).locator('i').click();
     |                                                                                                           ^ Error: locator.click: Test ended.
  6  |     this.takenOption = page.getByText('Taken');
  7  |     this.searchButton = page.getByRole('button', { name: 'Search' });
  8  |     this.recordsFound = page.getByText(/Records Found/);
  9  |   }
  10 | 
  11 |   async selectTakenLeaves() {
  12 |     await this.pendingApprovalClear.click();
  13 |     await this.leaveDropdown.click();
  14 |     await this.takenOption.click();
  15 |   }
  16 | 
  17 |   async clickSearch() {
  18 |     await this.searchButton.click();
  19 |   }
  20 | 
  21 |   async hasRecordsFound(count) {
  22 |     return await this.recordsFound.locator(`text=${count} Records Found`).isVisible();
  23 |   }
  24 | }
  25 | 
  26 | module.exports = { LeavePage };
```