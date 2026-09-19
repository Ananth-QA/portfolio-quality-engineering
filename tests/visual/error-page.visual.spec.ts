import { test, expect } from '@playwright/test';
import { NotFoundPage } from '../../src/pages/NotFoundPage';

test.describe('Custom 404 Page Visual Regression Suite (@visual)', () => {
  let notFoundPage: NotFoundPage;

  test.beforeEach(async ({ page }) => {
    notFoundPage = new NotFoundPage(page);
    await notFoundPage.triggerNotFound().catch(() => {});
  });

  test('TC-VIS-006: @visual should match custom 404 page visual baseline snapshot', async ({
    page,
  }) => {
    await notFoundPage.assertNotFoundVisible();
    const mainContent = page.locator('main').first();
    await expect(mainContent).toBeVisible();
    await expect(mainContent).toHaveScreenshot('404-error-page.png', {
      maxDiffPixelRatio: 0.05,
    });
  });
});
