import { test, expect } from '@playwright/test';
import { HomePage } from '../../src/pages/HomePage';
import { scanAccessibility, assertA11yQualityGate } from '../../src/utils/a11yHelper';

test.describe('Resume Hub Accessibility Audit Suite (@a11y)', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.open();
  });

  test('TC-A11Y-006: @a11y should perform automated WCAG 2.1 AA scan on Resume section', async ({
    page,
  }) => {
    const scanReport = await scanAccessibility(page);
    assertA11yQualityGate(scanReport, {
      blockOnCritical: true,
      blockOnSerious: true,
      blockOnModerate: false,
      blockOnMinor: false,
    });
  });

  test('TC-A11Y-006B: @a11y should verify resume download capability accessibility', async ({
    page,
  }) => {
    if (await homePage.heroResumeDownloadLink.isVisible()) {
      await expect(homePage.heroResumeDownloadLink).toBeVisible();
    } else {
      await expect(homePage.resumeHub.downloadButton).toBeVisible();
    }
  });
});
