import { Page, Locator, expect } from '@playwright/test';

/**
 * Abstract BasePage encapsulating generic Playwright page operations.
 */
export abstract class BasePage {
  constructor(protected readonly page: Page) {}

  /**
   * Returns underlying Playwright Page reference.
   */
  getPage(): Page {
    return this.page;
  }

  /**
   * Navigates to a relative path using configured baseURL with commit wait strategy.
   */
  async navigateTo(path: string = '/'): Promise<void> {
    await this.page.goto(path, { waitUntil: 'commit' });
    await this.page.waitForLoadState('domcontentloaded');
  }

  /**
   * Returns current URL.
   */
  async getUrl(): Promise<string> {
    return this.page.url();
  }

  /**
   * Returns document title.
   */
  async getTitle(): Promise<string> {
    return this.page.title();
  }

  /**
   * Waits for document DOM content loaded state.
   */
  async waitForLoad(): Promise<void> {
    await this.page.waitForLoadState('domcontentloaded');
  }

  /**
   * Scrolls to target locator into view if needed.
   */
  async scrollToElement(locator: Locator): Promise<void> {
    await locator.scrollIntoViewIfNeeded();
  }

  /**
   * Asserts element visibility.
   */
  async assertVisible(locator: Locator): Promise<void> {
    await expect(locator).toBeVisible();
  }
}
