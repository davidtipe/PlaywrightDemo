import {Locator} from '@playwright/test';

export async function keepBrowserOpenForDebugging()
{
    await new Promise(() => {})
}

export async function waitForElementVisible(element: Locator, timeout = 5000): Promise<void> {
    try {
        await element.waitFor({ state: 'visible', timeout });
    }
    catch(error) {
        console.log(`Error: Element was not visible within ${timeout}ms:`, error.message)
    }
}

export async function waitForElementNotVisible(element: Locator, timeout = 5000): Promise<void> {
    try {
        await element.waitFor({ state: 'visible', timeout });
    }
    catch(error) {
        console.log(`Error: Element was not hidden within ${timeout}ms:`, error.message)
    }
}

export function getFutureMonth(months: number): string {
    const futureDate = new Date();
    futureDate.setMonth(futureDate.getMonth() + months);
  
    return futureDate.toLocaleDateString('en-GB', {
      month: 'long',
      year: 'numeric',
    });
}

export function randomNumberGenerator(length: number){
    if (length <= 0) {
        throw new Error("Length must be a positive integer.");
    }
    const min = Math.pow(10, length - 1); 
    const max = Math.pow(10, length) - 1;

    return Math.floor(Math.random() * (max - min + 1)) + min;
}
