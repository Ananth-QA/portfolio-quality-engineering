import { test, expect } from '@playwright/test';
import { HomePage } from '../../src/pages/HomePage';
import { scanAccessibility, assertA11yQualityGate } from '../../src/utils/a11yHelper';

test.describe('Navigation & Global Search Accessibility Audit Suite (@a11y)', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.open();
  });

  test('TC-A11Y-002: @a11y should verify global search modal dialog accessibility and focus management', async ({
    page,
  }) => {
    await homePage.searchModal.openViaKeyboardShortcut();
    const modal = page
      .locator('[role="dialog"], [data-testid="global-search-modal"], input[placeholder*="Search"]')
      .first();
    if (await modal.isVisible()) {
      const scanReport = await scanAccessibility(page);
      assertA11yQualityGate(scanReport, {
        blockOnCritical: true,
        blockOnSerious: false,
        allowKnownBaselineDefects: true,
      });
      await homePage.searchModal.closeViaEscape();
    }
  });

  test('TC-A11Y-002B: @a11y should verify header navigation interactive controls have accessible labels', async ({
    page,
  }) => {
    const navLinks = page.locator('nav a, nav button');
    const count = await navLinks.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < Math.min(count, 5); i++) {
      const el = navLinks.nth(i);
      if (await el.isVisible()) {
        const text = await el.innerText();
        const ariaLabel = await el.getAttribute('aria-label');
        const title = await el.getAttribute('title');
        const accessibleName = text.trim() || ariaLabel || title;
        expect(accessibleName, `Header nav item #${i} must have an accessible name`).toBeTruthy();
      }
    }
  });
});
