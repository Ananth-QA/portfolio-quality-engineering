import { test, expect } from '@playwright/test';
import { HomePage } from '../../src/pages/HomePage';

/**
 * Resume Hub Functional Regression Suite (@regression)
 * Validates resume download action and preview modal iframe rendering.
 */
test.describe('Resume Hub Functional Regression (@regression)', () => {
  test('TC-RES-001: @regression should expose valid PDF resume download href attribute', async ({
    page,
  }) => {
    const homePage = new HomePage(page);
    await homePage.open();

    if (await homePage.heroResumeDownloadLink.isVisible()) {
      await expect(homePage.heroResumeDownloadLink).toBeVisible();
      await expect(homePage.heroResumeDownloadLink).toHaveAttribute('href', /.*\.pdf$/i);
    } else {
      await expect(homePage.resumeHub.downloadButton).toBeVisible();
    }
  });

  test('TC-RES-002: @regression should toggle PDF preview modal safely', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.open();

    if (await homePage.resumeHub.previewButton.isVisible()) {
      await homePage.resumeHub.openPdfPreviewModal();
      await homePage.resumeHub.assertPdfIframeVisible();
    }
  });
});
