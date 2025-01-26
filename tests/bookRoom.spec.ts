import { test, expect } from '@playwright/test';
import { HomePage } from '../pageObjects/HomePage';
import data from "../config/data.json";
import { getFutureMonth, waitForElementVisible } from '../utils/utils';
import { AdminPage } from '../pageObjects/AdminPage';
let homepage: HomePage;
let adminPage: AdminPage;
const futureDate = getFutureMonth(1)

test.beforeEach(async({page})=>{
  await page.goto('/');
  homepage = new HomePage(page);
  adminPage = new AdminPage(page);
})

test.describe('When I navigate to the home page and I click on "book this room" button,', () => {

    test('then I see a calender and form', async () => {
        await waitForElementVisible(homepage.getBookThisRoomButton().first() )
        const isButtonVisible = await homepage.getBookThisRoomButton().isVisible()
        test.skip(!isButtonVisible, 'No available rooms, skipping this test.')

        await homepage.getBookThisRoomButton().click()

        await expect(homepage.getBookingCalender()).toBeVisible()
        await expect(homepage.getBookingsForm()).toBeVisible()
    })

    test('and I click the cancel button, then should not display form ', async () => {
        await waitForElementVisible(homepage.getBookThisRoomButton().first())
        const isButtonVisible = await homepage.getBookThisRoomButton().isVisible()
        test.skip(!isButtonVisible, 'No available rooms, skipping this test.')

        await homepage.getBookThisRoomButton().click()

        await homepage.getCancelBookingsBtn().first().click()
        await expect(homepage.getBookingCalender()).not.toBeVisible()
        await expect(homepage.getBookingsForm()).not.toBeVisible()
    })

    test('and I select a date and fill form with valid credentials, then booking is confirmed', async () => {
        await waitForElementVisible(homepage.getBookThisRoomButton().first())
        const isButtonVisible = await homepage.getBookThisRoomButton().isVisible()
        test.skip(!isButtonVisible, 'No available rooms, skipping this test.')
        await homepage.getBookThisRoomButton().click()

        await homepage.navigateToMonth(futureDate)
        await homepage.clickAndDragDates(homepage.getDaysInCalender().first(), homepage.getDaysInCalender().nth(7))
        await homepage.fillBookARoomFormAndSubmit(data.roomBookingInputValues)
        await homepage.waitForTimeOut()
        await expect(homepage.getBookingConfirmationModal()).toBeVisible()
        const modalText = await homepage.getBookingConfirmationModal().textContent();
        for (const message of data.confirmationModalMessages) {
            expect(modalText).toContain(message);
        }
    })

    test('and navigate to the same date, then unavailable is displayed on the calender', async () => {
        await waitForElementVisible(homepage.getBookThisRoomButton().first())
        const isButtonVisible = await homepage.getBookThisRoomButton().isVisible()
        test.skip(!isButtonVisible, 'No available rooms, skipping this test.')
        await homepage.getBookThisRoomButton().click()
        
        await homepage.navigateToMonth(futureDate)
        await expect(homepage.getCalenderContent().first()).toHaveText('Unavailable')
    })

    test('and attempt to rebook the same dates, then error message is displayed', async () => {
        await waitForElementVisible(homepage.getBookThisRoomButton().first())
        const isButtonVisible = await homepage.getBookThisRoomButton().isVisible()
        test.skip(!isButtonVisible, 'No available rooms, skipping this test.')
        await homepage.getBookThisRoomButton().click()

        await homepage.navigateToMonth(futureDate)
        await homepage.clickAndDragDates(homepage.getDaysInCalender().first(), homepage.getDaysInCalender().nth(7))
        await homepage.fillBookARoomFormAndSubmit(data.roomBookingInputValues)
        await expect(homepage.getBookingErrorMessage()).toHaveText(data.bookingErrorMessage)
    })
})