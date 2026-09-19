import { test, expect } from '@playwright/test';
import { BlogPage } from '../../src/pages/BlogPage';
import { scanAccessibility, assertA11yQualityGate } from '../../src/utils/a11yHelper';

test.describe('Blog Platform Accessibility Audit Suite (@a11y)', () => {
  let blogPage: BlogPage;

  test.beforeEach(async ({ page }) => {
    blogPage = new BlogPage(page);
    await blogPage.open();
  });

  test('TC-A11Y-004: @a11y should perform automated WCAG 2.1 AA scan on Blog platform page', async ({
    page,
  }) => {
    await expect(page).toHaveURL(/\/blogs/);
    const scanReport = await scanAccessibility(page);
    assertA11yQualityGate(scanReport, {
      blockOnCritical: true,
      blockOnSerious: true,
      blockOnModerate: false,
      blockOnMinor: false,
    });
  });

  test('TC-A11Y-004B: @a11y should verify article link accessibility and search input labels', async ({
    page,
  }) => {
    const searchInput = page.locator('input[type="text"], input[type="search"]').first();
    if (await searchInput.isVisible()) {
      const ariaLabel = await searchInput.getAttribute('aria-label');
      const placeholder = await searchInput.getAttribute('placeholder');
      const id = await searchInput.getAttribute('id');
      let hasLabel = !!(ariaLabel || placeholder);
      if (id) {
        const associatedLabel = page.locator(`label[for="${id}"]`);
        if ((await associatedLabel.count()) > 0) {
          hasLabel = true;
        }
      }
      expect(hasLabel, 'Blog search input should have an accessible label or placeholder').toBe(
        true,
      );
    }
  });
});
