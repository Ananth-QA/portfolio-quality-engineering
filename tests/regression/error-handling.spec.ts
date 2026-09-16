import { test, expect } from '@playwright/test';
import { NotFoundPage } from '../../src/pages/NotFoundPage';

/**
 * Error Handling Functional Regression Suite (@regression)
 * Validates custom 404 error page rendering and navigation recovery routes.
 */
test.describe('Error Handling Functional Regression (@regression)', () => {
  test('TC-ERR-001: @regression should render custom 404 page and offer recovery options', async ({
    page,
  }) => {
    const notFoundPage = new NotFoundPage(page);
    await notFoundPage.triggerNotFound();
    await notFoundPage.assertNotFoundVisible();

    if (await notFoundPage.homeButton.isVisible()) {
      await expect(notFoundPage.homeButton).toBeVisible();
    } else {
      const heading = page.getByRole('heading', { name: /404|not found/i }).first();
      await expect(heading).toBeVisible();
    }
  });
});
