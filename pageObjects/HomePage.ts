import { Locator } from "@playwright/test";
import { waitForElementVisible } from "../utils/utils";
import { BasePage } from "./BasePage";

export class HomePage extends BasePage
{
    private hotelDescription = '.row.hotel-description'
    // private hotelRoomInfo = '.row.hotel-room-info';
    private nameField = '#name'
    private emailField = '#email'
    private phoneField = '#phone'
    private subjectField = '#subject'
    private messageField = '#description'
    private submitBtn = '#submitContact'
    private errorMessages = '.alert.alert-danger p'
    private contactUsForm = '.row.contact form'
    private successMsg1 = '.row.contact h2'
    private successMsg2 = '.col-sm-5:nth-child(2) p:nth-child(2)'
    private successMsg3 = '.col-sm-5:nth-child(2) p:nth-child(3)'
    private successMsg4 = '.col-sm-5:nth-child(2) p:nth-child(4)'
    private bookThisRoomButton = '.openBooking'
    private bookingCalender = '.rbc-calendar'
    private bookingsForm = '.col-sm-4'
    private cancelBookingsBtn = 'button:nth-child(5)'
    private monthLabel = '.rbc-toolbar-label:nth-child(2)'
    private calenderNextBtn = '.rbc-toolbar button:nth-child(3)'
    private daysInCalender = '.rbc-month-view .rbc-button-link'
    private bookingsFirstName = '.room-firstname'
    private bookingsLastName = '.room-lastname'
    private bookingsEmail = '.room-email'
    private bookingsPhone = '.room-phone'
    private roomBookingBtn = '.col-sm-4 button:nth-child(6)'
    private calenderContent = '.rbc-month-row .rbc-event'
    private bookingConfirmationModal = '.col-sm-6.text-center'
    private bookingErrorMessage = '.alert-danger p'
    private hotelImg = '.hotel-room-info .hotel-img'
    private hotelInfo = '.col-sm-7'

    getHotelDescription()
    {
        return this.page.locator(this.hotelDescription)
    }

    getNameField()
    {
        return this.page.locator(this.nameField)
    }

    getEmailField()
    {
        return this.page.locator(this.emailField)
    }

    getPhoneField()
    {
        return this.page.locator(this.phoneField)
    }

    getSubjectField()
    {
        return this.page.locator(this.subjectField)
    }

    getMessageField()
    {
        return this.page.locator(this.messageField)
    }

    async clickSubmitButton()
    {
        await this.page.locator(this.submitBtn).click()
    }

    getErrorMessages()
    {
        return this.page.locator(this.errorMessages)
    }

    async fillform(value: { name: string; email: string; phone: string; subject: string; message: string })
    {
        const { name, email, phone, subject, message } = value;
        await this.getNameField().fill(name)
        await this.getEmailField().fill(email)
        await this.getPhoneField().fill(phone)
        await this.getSubjectField().fill(subject)
        await this.getMessageField().fill(message)
    }

    getContactUsForm()
    {
        return this.page.locator(this.contactUsForm)
    }

    getSuccessMsg1()
    {
        return this.page.locator(this.successMsg1)
    }

    getSuccessMsg2()
    {
        return this.page.locator(this.successMsg2)
    }

    getSuccessMsg3()
    {
        return this.page.locator(this.successMsg3)
    }

    getSuccessMsg4()
    {
        return this.page.locator(this.successMsg4)
    }

    getBookThisRoomButton()
    {
        return this.page.locator(this.bookThisRoomButton).first()
    }

    getBookingCalender()
    {
        return this.page.locator(this.bookingCalender)
    }

    getBookingsForm()
    {
        return this.page.locator(this.bookingsForm)
    }

    getCancelBookingsBtn()
    {
        return this.page.locator(this.cancelBookingsBtn)
    }

    getMonthLabel()
    {
        return this.page.locator(this.monthLabel)
    }

    getDaysInCalender()
    {
        return this.page.locator(this.daysInCalender)
    }

    getCalenderNextBtn()
    {
        return this.page.locator(this.calenderNextBtn)
    }

    getBookingsFirstName()
    {
        return this.page.locator(this.bookingsFirstName)
    }

    getBookingsLastName()
    {
        return this.page.locator(this.bookingsLastName)
    }

    getBookingsEmail()
    {
        return this.page.locator(this.bookingsEmail)
    }

    getBookingsPhone()
    {
        return this.page.locator(this.bookingsPhone)
    }

    getRoomBookingBtn()
    {
        return this.page.locator(this.roomBookingBtn)
    }

    getCalenderContent()
    {
        return this.page.locator(this.calenderContent)
    }

    getBookingConfirmationModal()
    {
        return this.page.locator(this.bookingConfirmationModal)
    }

    getBookingErrorMessage(){
        return this.page.locator(this.bookingErrorMessage)
    }

    getHotelImg(){
        return this.page.locator(this.hotelImg)
    }

    getHotelInfo(){
        return this.page.locator(this.hotelInfo)
    }

    async navigateToMonth(startMonth: string): Promise<void> {    
        let currentMonthLabel = await this.getMonthLabel().textContent() as string;
    
        while (!currentMonthLabel.includes(startMonth)) {
            await this.getCalenderNextBtn().click();
            await this.page.waitForTimeout(500);
    
            currentMonthLabel = await this.getMonthLabel().textContent() as string;
    
            if (currentMonthLabel === undefined || currentMonthLabel.trim() === '') {
                throw new Error('Failed to fetch the current month label.');
            }
        }
    }

    // async getBookingDayLocators(startDay: string, endDay: number) {
    //     const [targetStartDay] = startDay.split(' ');
    //     const allDays= await this.getDaysInCalender().all()
    //     let startDayLocator: Locator | null = null;
    //     let endDayLocator: Locator | null = null;
    //     for(let i = 0; i < allDays.length; i++ ){
    //         const day = allDays[i];
    //         const dayText = await day.textContent();
    //         if(dayText?.trim() === targetStartDay.trim())
    //         {
    //             console.log('i ' + i)
    //             startDayLocator = day
    //             console.log('startDayLocator '+startDayLocator)
    //             const endDayIndex = i + endDay;
    //             if (endDayIndex < allDays.length) {
    //                 endDayLocator = allDays[endDayIndex];
    //                 console.log('startDayLocator' + endDayLocator)
    //             }
    //             break;
    //         }
    //     }
    //     if (!startDayLocator || !endDayLocator) {
    //         throw new Error(
    //             `Failed to locate the start day (${targetStartDay}) or end day (offset: ${endDay}).`
    //         );
    //     }
    //     return { startDayLocator, endDayLocator };
    // }
    

    // async selectBookingDates(startDay: string, endDay: number) {
    //     const [_, month, year] = startDay.split(' ');
    //     const selectedMonthYear = `${month} ${year}`; 
    
    //     await this.navigateToMonth(selectedMonthYear);
    
    //     const { startDayLocator, endDayLocator } = await this.getBookingDayLocators(startDay, endDay);
    //     await this.clickAndDragDates(startDayLocator, endDayLocator);
    // }

    async fillBookARoomFormAndSubmit(value: { firstName: string; lastName: string, email: string; phone: string;})
    {
        const { firstName, lastName, email, phone } = value;
        {
            await this.getBookingsFirstName().fill(firstName)
            await this.getBookingsLastName().fill(lastName)
            await this.getBookingsEmail().fill(email)
            await this.getBookingsPhone().fill(phone)
            await this.getRoomBookingBtn().click()
        }
    }
}