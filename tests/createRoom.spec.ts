import { test, expect } from '@playwright/test';
import data from '../config/data.json';
import { AdminPage } from '../pageObjects/AdminPage';
import { HomePage } from '../pageObjects/HomePage';
import { keepBrowserOpen, randomNumberGenerator, waitForElementVisible } from '../utils/utils';
let adminPage: AdminPage;
let homePage: HomePage;
const roomNumber = randomNumberGenerator(3)

test.beforeEach(async({page})=>{
await page.goto('/#/admin');
adminPage = new AdminPage(page);
homePage = new HomePage(page)
adminPage.loginToAdminPage(data)
})

test.describe('when I navigate to the admin page', () => {
    test('and I click create button with blank input, then should see error message', async () => {
        await adminPage.getcreateRoomBtn().click()

        const errorMsg = await adminPage.getCreateRoomErrorMsg().textContent()
        for (const message of data.createRoomErrorMsgs) {
            expect(errorMsg).toContain(message);
        }
    });

    test('and I provide valid inputs, then should create room', async () => {
        data.createRoomOptions.randomNumber = roomNumber.toString()
        await adminPage.createARoom(data.createRoomOptions)
        await adminPage.getFrontpageNavLink().click()

        await waitForElementVisible(homePage.getHotelImg().last())
        const imgElement = await homePage.getHotelImg().last()
        await expect(await imgElement.getAttribute('alt')).toContain(data.createRoomOptions.randomNumber.toString())
        await expect(await homePage.getHotelInfo().last().textContent()).toContain(data.createRoomOptions.roomType)
        
    })

    test('then I can delete a recently created room', async () => {
        await waitForElementVisible(adminPage.getDeleteRoomIcon().last())
        await adminPage.getDeleteRoomIcon().last().click()
        await adminPage.waitForTimeOut()

        const count = await adminPage.getRoomListing().count()
        const originalRoomListingText = 
        `${roomNumber}${data.createRoomOptions.roomType}${data.createRoomOptions.boolValue}${data.createRoomOptions.price}`
        console.log('originalRoomListingText '+originalRoomListingText)
        for(let i = 0; i < count; i++){
            const roomListingText = await adminPage.getRoomListing().nth(i).textContent()
            await expect(roomListingText).not.toContain(originalRoomListingText)
        }
    })
});