import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Page Object representing Custom 404 Error Page (`/404`).
 */
export class NotFoundPage extends BasePage {
  readonly container: Locator;
  readonly homeButton: Locator;
  readonly blogsButton: Locator;
  readonly resumeButton: Locator;

  constructor(page: Page) {
    super(page);
    this.container = page.getByTestId('not-found-container');
    this.homeButton = page.getByTestId('not-found-home-button');
    this.blogsButton = page.getByTestId('not-found-blogs-button');
    this.resumeButton = page.getByTestId('not-found-resume-button');
  }

  /**
   * Triggers non-existent URL to test 404 error page.
   */
  async triggerNotFound(): Promise<void> {
    await this.navigateTo('/non-existent-route-for-testing-404');
    await this.waitForLoad();
  }

  /**
   * Asserts 404 page elements are displayed.
   */
  async assertNotFoundVisible(): Promise<void> {
    if (await this.container.isVisible()) {
      await expect(this.container).toBeVisible();
    } else {
      const heading = this.page.getByRole('heading', { name: /404|not found/i }).first();
      await expect(heading).toBeVisible();
    }
  }
}
