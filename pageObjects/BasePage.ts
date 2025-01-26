import {Page, Locator} from '@playwright/test';

export class BasePage {
    protected page: Page;

    constructor(page: Page)
    {
        this.page = page;
    }

    async navigateTo(url: string)
    {
        await this.page.goto(url);
    }

    async waitForTimeOut(timeout=2000)
    {
        await this.page.waitForTimeout(timeout);
    }

    async clickAndDragDates(startDate: Locator, endDate: Locator): Promise<void> {
        try {
            // Get the bounding boxes for start and end dates
            const startBox = await startDate.boundingBox();
            const endBox = await endDate.boundingBox();
    
            if (!startBox || !endBox) {
                throw new Error('Could not locate start or end date elements');
            }
    
            // Calculate the midpoints for the start and end
            const startX = startBox.x + startBox.width / 2;
            const startY = startBox.y + startBox.height / 2;
    
            // Add a small offset to the end point to ensure the drag registers
            const endX = endBox.x + endBox.width / 2 + 2; // Add a 2-pixel offset to the right
            const endY = endBox.y + endBox.height / 2;
    
            // Perform the drag operation
            const mouse = this.page.mouse;
            await mouse.move(startX, startY);
            await mouse.down();
            await mouse.move(endX, endY, { steps: 10 }); // Drag with steps
            await mouse.up();
        } catch (error) {
            console.error('Error during click and drag operation:', error.message);
        }
    }
    
    
}