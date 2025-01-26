import { test, expect } from '@playwright/test';
import { HomePage } from '../pageObjects/HomePage';
import data from "../config/data.json";

let homepage: HomePage;

test.beforeEach(async({page})=>{
  await page.goto('/');
  homepage = new HomePage(page);
})

test.describe('When I navigate to the home page', () => {
    test('then hotel description is displayed', async () => {
        await expect(homepage.getHotelDescription()).toContainText(data.hotelDescription)
    })

    test('then form fields are visible', async ({page}) => {
        await expect(homepage.getNameField()).toBeVisible()
        await expect(homepage.getEmailField()).toBeVisible()
        await expect(homepage.getPhoneField()).toBeVisible()
        await expect(homepage.getSubjectField()).toBeVisible()
        await expect(homepage.getMessageField()).toBeVisible()
    })

    test('and I click on the form submit btn, then errors are displayed', async ({page}) => {
        await homepage.clickSubmitButton()
        await homepage.getErrorMessages().first().waitFor({ state: 'visible', timeout: 5000 });
        const errorMessages = await homepage.getErrorMessages().allTextContents()
        const actualMessages = await errorMessages.map(msg => msg.trim()).sort();
        const expectedMessages = await data.formValidationMessages.sort();
        await expect(actualMessages).toEqual(expectedMessages);
    })

    test('then I can submit form with valid inputs and verify successful submission message', async ({page}) => {
        await homepage.fillform(data.formInputValues)
        await homepage.clickSubmitButton()
        await expect(homepage.getContactUsForm()).not.toBeVisible()

        await expect(homepage.getSuccessMsg1())
        .toContainText(`${data.formSubmissionSuccessMsg1}${data.formInputValues.name}`);
        await expect(homepage.getSuccessMsg2())
        .toContainText(`${data.formSubmissionSuccessMsg2}`)
        await expect(homepage.getSuccessMsg3())
        .toContainText(`${data.formInputValues.subject}`)
        await expect(homepage.getSuccessMsg4())
        .toContainText(`${data.formSubmissionSuccessMsg3}`)
    })
})