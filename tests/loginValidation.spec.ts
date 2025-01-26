import { test, expect } from '@playwright/test';
import { AdminPage } from '../pageObjects/AdminPage';
import data from "../config/data.json";

let adminPage: AdminPage;

test.beforeEach(async({page})=>{
  await page.goto('/#/admin');
  adminPage = new AdminPage(page);
})

test.describe('When I navigate to the admin page', () => {
  test('and I enter invalid credentials, then I should not be logged in', async ({page}) => {
    let statusCode: number = 0;
    await page.route('/auth/validate', async (route) => {
      const response = await route.fetch();
      statusCode = response.status()
      await route.fulfill({
        status: response.status(),
        headers: response.headers(),
        body: await response.body(),
      });
    })
    
    await adminPage.enterUsername(data.invalidUsername)
    await adminPage.enterPassword(data.invalidPassword)
    await adminPage.clickLogin()
    await page.waitForLoadState('networkidle');

    expect(statusCode).toBe(403)
  });

  test('then I should be logged in successfully', async () => {
    adminPage.loginToAdminPage(data)

    await expect(adminPage.getLogoutNavLink()).toBeVisible()
  });
})

