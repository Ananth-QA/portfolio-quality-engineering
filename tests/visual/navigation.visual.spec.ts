import { test, expect } from '@playwright/test';
import { HomePage } from '../../src/pages/HomePage';

test.describe('Navigation Visual Regression Suite (@visual)', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.open();
  });

  test('TC-VIS-002: @visual should match header navigation component visual baseline snapshot', async ({
    page,
  }) => {
    const navHeader = homePage.navbar.navHeader;
    await expect(navHeader).toBeVisible();
    await expect(navHeader).toHaveScreenshot('navigation-header.png', {
      maxDiffPixelRatio: 0.05,
    });
  });

  test('TC-VIS-002B: @visual should match search modal dialog visual baseline snapshot when opened', async ({
    page,
  }) => {
    await homePage.searchModal.openViaKeyboardShortcut();
    const modal = page.locator('[role="dialog"], [data-testid="global-search-modal"]').first();
    if (await modal.isVisible()) {
      await expect(modal).toHaveScreenshot('global-search-modal.png', {
        maxDiffPixelRatio: 0.05,
      });
      await homePage.searchModal.closeViaEscape();
    }
  });
});
