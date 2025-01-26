import { randomNumberGenerator } from "../utils/utils";
import { BasePage } from "./BasePage";

export class AdminPage extends BasePage
{
    private username = '#username'
    private password = '#password'
    private loginButton = '#doLogin'
    private logoutNavLink = '.nav-link:has-text("Logout")'
    private roomName = '[data-testid="roomName"]'
    private roomType = 'select#type'
    private roomAccessibility = 'select#accessible'
    private roomPrice = '#roomPrice'
    private wifiCheckBox = '#wifiCheckbox'
    private tvCheckBox = '#tvCheckbox'
    private radioCheckBox = '#radioCheckbox'
    private refreshmentCheckbox = '#refreshCheckbox'
    private safeCheckbox = '#safeCheckbox'
    private viewsCheckbox = '#viewsCheckbox'
    private createRoomBtn = '#createRoom'
    private createRoomErrorMsg = '.alert-danger'
    private frontpageNavLink = '#frontPageLink'
    private deleteRoomIcon = 'span.roomDelete'
    private roomListing = '[data-testid="roomlisting"]'


    getLogoutNavLink() {
        return this.page.locator(this.logoutNavLink)
    }

    getRoomName(){
        return this.page.locator(this.roomName)
    }

    getRoomType(){
        return this.page.locator(this.roomType)
    }

    getRoomAccessibility(){
        return this.page.locator(this.roomAccessibility)
    }

    getRoomPrice(){
        return this.page.locator(this.roomPrice)
    }

    getWifiCheckBox(){
        return this.page.locator(this.wifiCheckBox)
    }

    getTvCheckBox(){
        return this.page.locator(this.tvCheckBox)
    }

    getRadioCheckBox(){
        return this.page.locator(this.radioCheckBox)
    }

    getRefreshmentCheckbox(){
        return this.page.locator(this.refreshmentCheckbox)
    }

    getSafeCheckbox(){
        return this.page.locator(this.safeCheckbox)
    }

    getViewsCheckbox(){
        return this.page.locator(this.viewsCheckbox)
    }

    getcreateRoomBtn(){
        return this.page.locator(this.createRoomBtn)
    }

    getCreateRoomErrorMsg(){
        return this.page.locator(this.createRoomErrorMsg)
    }

    getFrontpageNavLink(){
        return this.page.locator(this.frontpageNavLink)
    }

    getDeleteRoomIcon(){
        return this.page.locator(this.deleteRoomIcon)
    }

    getRoomListing(){
        return this.page.locator(this.roomListing)
    }

    async loginToAdminPage(value: { validUsername: string; validPassword: string})
    {
        const { validUsername, validPassword } = value;
        await this.enterUsername(validUsername)
        await this.enterPassword(validPassword)
        await this.clickLogin()
    }

    async enterUsername(username: string)
    {
        await this.page.fill(this.username, username)
    }

    async enterPassword(password: string)
    {
        await this.page.fill(this.password, password)
    }

    async clickLogin()
    {
        await this.page.click(this.loginButton)
    }

    async createARoom(value: {randomNumber: string; roomType: string; boolValue: string; price: string}){
        const {randomNumber, roomType, boolValue, price} = value
        await this.getRoomName().fill(randomNumber)
        await this.getRoomType().selectOption(roomType)
        await this.getRoomAccessibility().selectOption(boolValue)
        await this.getRoomPrice().fill(price)
        await this.getWifiCheckBox().click()
        await this.getTvCheckBox().click()
        await this.getRadioCheckBox().click()
        await this.getRefreshmentCheckbox().click()
        await this.getSafeCheckbox().click()
        await this.getViewsCheckbox().click()
        await this.getcreateRoomBtn().click()
    }
}