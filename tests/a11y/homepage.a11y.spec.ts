import { test, expect } from '@playwright/test';
import { HomePage } from '../../src/pages/HomePage';
import { scanAccessibility, assertA11yQualityGate } from '../../src/utils/a11yHelper';

test.describe('Homepage Accessibility Audit Suite (@a11y)', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.open();
  });

  test('TC-A11Y-001: @a11y should perform automated WCAG 2.1 AA scan on Homepage', async ({
    page,
  }) => {
    await expect(page).toHaveTitle(/Ananth/i);
    const scanReport = await scanAccessibility(page);
    assertA11yQualityGate(scanReport, {
      blockOnCritical: true,
      blockOnSerious: true,
      blockOnModerate: false,
      blockOnMinor: false,
    });
  });

  test('TC-A11Y-001B: @a11y should verify hero section heading hierarchy and accessible images', async ({
    page,
  }) => {
    const heroHeading = page.locator('h1').first();
    await expect(heroHeading).toBeVisible();

    const images = page.locator('img');
    const imageCount = await images.count();
    for (let i = 0; i < imageCount; i++) {
      const img = images.nth(i);
      if (await img.isVisible()) {
        const alt = await img.getAttribute('alt');
        const ariaHidden = await img.getAttribute('aria-hidden');
        const role = await img.getAttribute('role');
        const isDecorative = ariaHidden === 'true' || role === 'presentation';
        expect(
          isDecorative || (alt !== null && alt !== undefined),
          `Image at index ${i} should have an alt attribute or aria-hidden`,
        ).toBe(true);
      }
    }
  });
});
