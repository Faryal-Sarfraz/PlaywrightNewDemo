# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: leave.spec.js >> Leave Module Tests >> leave list returns no Taken records
- Location: tests\leave.spec.js:7:3

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.waitFor: Test timeout of 30000ms exceeded.
Call log:
  - waiting for getByRole('link', { name: 'Leave' }) to be visible

```

# Page snapshot

```yaml
- generic [ref=f1e3]:
  - generic:
    - complementary [ref=f1e4]:
      - navigation "Sidepanel" [ref=f1e5]:
        - generic [ref=f1e6]:
          - link [ref=f1e7] [cursor=pointer]:
            - /url: https://www.orangehrm.com/
            - img "client brand banner" [ref=f1e9]
          - text: 
        - generic [ref=f1e10]:
          - generic [ref=f1e11]:
            - generic [ref=f1e12]:
              - textbox "Search" [ref=f1e15]
              - button "" [ref=f1e16] [cursor=pointer]
            - separator [ref=f1e18]
          - list [ref=f1e19]:
            - listitem [ref=f1e20]:
              - link "Admin" [ref=f1e21] [cursor=pointer]:
                - /url: /web/index.php/admin/viewAdminModule
            - listitem [ref=f1e25]:
              - link "PIM" [ref=f1e26] [cursor=pointer]:
                - /url: /web/index.php/pim/viewPimModule
            - listitem [ref=f1e41]:
              - link "My Info" [ref=f1e42] [cursor=pointer]:
                - /url: /web/index.php/pim/viewMyDetails
            - listitem [ref=f1e49]:
              - link "Dashboard" [ref=f1e50] [cursor=pointer]:
                - /url: /web/index.php/dashboard/index
            - listitem [ref=f1e54]:
              - link "Claim" [ref=f1e55] [cursor=pointer]:
                - /url: /web/index.php/claim/viewClaimModule
    - banner [ref=f1e63]:
      - generic [ref=f1e64]:
        - generic [ref=f1e65]:
          - text: 
          - heading "Dashboard" [level=6] [ref=f1e67]
        - link [ref=f1e69]:
          - /url: https://orangehrm.com/open-source/upgrade-to-advanced
          - button "Upgrade" [ref=f1e70] [cursor=pointer]
        - list [ref=f1e76]:
          - listitem [ref=f1e77]:
            - generic [ref=f1e78] [cursor=pointer]:
              - img "profile picture" [ref=f1e79]
              - paragraph [ref=f1e80]: manda user
              - generic [ref=f1e81]: 
      - navigation "Topbar Menu" [ref=f1e83]:
        - list [ref=f1e84]:
          - button "" [ref=f1e86] [cursor=pointer]
  - generic [ref=f1e88]:
    - generic [ref=f1e90]:
      - generic [ref=f1e92]:
        - generic [ref=f1e94]:
          - generic [ref=f1e95]: 
          - paragraph [ref=f1e96]: My Actions
        - separator [ref=f1e97]
        - generic [ref=f1e99]:
          - img "No Content" [ref=f1e100]
          - paragraph [ref=f1e101]: No Pending Actions to Perform
      - generic [ref=f1e103]:
        - generic [ref=f1e105]:
          - generic [ref=f1e106]: 
          - paragraph [ref=f1e107]: Quick Launch
        - separator [ref=f1e108]
        - generic [ref=f1e110]:
          - img "No Content" [ref=f1e111]
          - paragraph [ref=f1e112]: Not Available
      - generic [ref=f1e114]:
        - generic [ref=f1e116]:
          - generic [ref=f1e117]: 
          - paragraph [ref=f1e118]: Employee Distribution by Sub Unit
        - separator [ref=f1e119]
        - list [ref=f1e124]:
          - listitem [ref=f1e125] [cursor=pointer]:
            - generic "Engineering" [ref=f1e127]
          - listitem [ref=f1e128] [cursor=pointer]:
            - generic "Human Resources" [ref=f1e130]
          - listitem [ref=f1e131] [cursor=pointer]:
            - generic "Administration" [ref=f1e133]
          - listitem [ref=f1e134] [cursor=pointer]:
            - generic "Client Services" [ref=f1e136]
          - listitem [ref=f1e137] [cursor=pointer]:
            - generic "Unassigned" [ref=f1e139]
      - generic [ref=f1e141]:
        - generic [ref=f1e143]:
          - generic [ref=f1e144]: 
          - paragraph [ref=f1e145]: Employee Distribution by Location
        - separator [ref=f1e146]
        - list [ref=f1e151]:
          - listitem [ref=f1e152] [cursor=pointer]:
            - generic "Texas R&D" [ref=f1e154]
          - listitem [ref=f1e155] [cursor=pointer]:
            - generic "New York Sales Office" [ref=f1e157]
          - listitem [ref=f1e158] [cursor=pointer]:
            - generic "Unassigned" [ref=f1e160]
    - generic [ref=f1e161]:
      - paragraph [ref=f1e162]: OrangeHRM OS 5.9
      - paragraph [ref=f1e163]:
        - text: © 2005 - 2026
        - link "OrangeHRM, Inc" [ref=f1e164] [cursor=pointer]:
          - /url: http://www.orangehrm.com
        - text: . All rights reserved.
```

# Test source

```ts
  1  | const { BasePage } = require('./BasePage');
  2  | 
  3  | class DashboardPage extends BasePage {
  4  |   constructor(page) {
  5  |     super(page);
  6  |     this.profileMenu = page.getByRole('img', { name: 'Profile picture' });
  7  |     this.dashboardHeader = page.getByRole('heading', { name: 'Dashboard' });
  8  |     this.searchInput = page.getByRole('textbox', { name: 'Search' });
  9  |     this.sidepanelLabel = page.getByLabel('Sidepanel').locator('span');
  10 |     this.leaveLink = page.getByRole('link', { name: 'Leave' });
  11 |   }
  12 | 
  13 |   async getDashboardHeaderText() {
  14 |     return await this.getText(this.dashboardHeader);
  15 |   }
  16 | 
  17 |   async openProfileMenu() {
  18 |     await this.click(this.profileMenu);
  19 |   }
  20 | 
  21 |   async search(term) {
  22 |     await this.fill(this.searchInput, term);
  23 |   }
  24 | 
  25 |   async getSidepanelLabelText() {
  26 |     return await this.getText(this.sidepanelLabel);
  27 |   }
  28 | 
  29 |   async isLeaveMenuVisible() {
  30 |     return await this.sidepanelLabel.isVisible();
  31 |   }
  32 | 
  33 |   async clickLeaveMenu() {
> 34 |     await this.leaveLink.waitFor({ state: 'visible' });
     |                          ^ Error: locator.waitFor: Test timeout of 30000ms exceeded.
  35 |     await this.click(this.leaveLink);
  36 |   }
  37 | }
  38 | 
  39 | module.exports = { DashboardPage };
```