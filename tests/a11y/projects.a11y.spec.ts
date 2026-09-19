import { test, expect } from '@playwright/test';
import { HomePage } from '../../src/pages/HomePage';
import { scanAccessibility, assertA11yQualityGate } from '../../src/utils/a11yHelper';

test.describe('Projects Section Accessibility Audit Suite (@a11y)', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.open();
    await homePage.navbar.clickSectionLink('projects');
  });

  test('TC-A11Y-003: @a11y should perform automated WCAG 2.1 AA scan on Projects section', async ({
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

  test('TC-A11Y-003B: @a11y should verify project card search input has accessible controls', async ({
    page,
  }) => {
    await expect(homePage.projectCard.searchInput).toBeVisible();
    const placeholder = await homePage.projectCard.searchInput.getAttribute('placeholder');
    const ariaLabel = await homePage.projectCard.searchInput.getAttribute('aria-label');
    expect(
      !!(placeholder || ariaLabel),
      'Project search input should have accessible label or placeholder',
    ).toBe(true);
  });
});
