import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Page Object representing Blog Platform (`/blogs`).
 */
export class BlogPage extends BasePage {
  readonly searchInput: Locator;
  readonly articleCards: Locator;
  readonly paginationButtons: Locator;

  constructor(page: Page) {
    super(page);
    this.searchInput = page
      .locator('input[aria-label="Search articles"], input[placeholder*="Search"]')
      .first();
    this.articleCards = page.locator('article');
    this.paginationButtons = page.locator('nav button, div[role="navigation"] button');
  }

  /**
   * Navigates to `/blogs` and waits for load.
   */
  async open(): Promise<void> {
    await this.navigateTo('/blogs');
    await this.waitForLoad();
  }

  /**
   * Enters search query into blog search input.
   */
  async searchArticles(keyword: string): Promise<void> {
    if (await this.searchInput.isVisible()) {
      await this.searchInput.fill(keyword);
    }
  }

  /**
   * Clicks page number button in pagination navigation.
   */
  async clickPageNumber(pageNumber: number): Promise<void> {
    const pageButton = this.page.getByRole('button', {
      name: pageNumber.toString(),
      exact: true,
    });
    await pageButton.click();
  }

  /**
   * Asserts blog articles are displayed.
   */
  async assertArticlesVisible(): Promise<void> {
    await expect(this.articleCards.first()).toBeVisible({ timeout: 10000 });
  }
}
