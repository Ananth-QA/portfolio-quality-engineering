import { Page, Locator, expect } from '@playwright/test';

/**
 * Component Object representing Experience Timeline section.
 */
export class ExperienceTimeline {
  readonly timelineContainer: Locator;

  constructor(private readonly page: Page) {
    this.timelineContainer = page.getByTestId('experience-timeline');
  }

  /**
   * Toggles expandable achievements drawer by item ID.
   */
  async toggleItemExpand(itemId: string): Promise<void> {
    const expandButton = this.page.getByTestId(`experience-expand-${itemId}`);
    if (await expandButton.isVisible()) {
      await expandButton.click();
    } else {
      await this.page
        .getByRole('button', { name: /achievements|tech stack/i })
        .first()
        .click();
    }
  }

  /**
   * Asserts timeline container visibility.
   */
  async assertTimelineVisible(): Promise<void> {
    await expect(this.timelineContainer).toBeVisible();
  }
}
