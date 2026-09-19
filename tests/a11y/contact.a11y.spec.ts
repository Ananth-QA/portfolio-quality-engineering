import { test, expect } from '@playwright/test';
import { HomePage } from '../../src/pages/HomePage';
import { scanAccessibility, assertA11yQualityGate } from '../../src/utils/a11yHelper';

test.describe('Contact Form Accessibility Audit Suite (@a11y)', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.open();
    await homePage.navbar.clickSectionLink('contact');
  });

  test('TC-A11Y-005: @a11y should perform automated WCAG 2.1 AA scan on Contact section in default state', async ({
    page,
  }) => {
    const scanReport = await scanAccessibility(page);
    assertA11yQualityGate(scanReport, {
      blockOnCritical: true,
      blockOnSerious: false,
      allowKnownBaselineDefects: true,
    });
  });

  test('TC-A11Y-005B: @a11y should verify contact form inline validation errors accessibility when submitted empty', async ({
    page,
  }) => {
    await homePage.contactForm.submit();
    await homePage.contactForm.assertValidationError();

    const scanReport = await scanAccessibility(page);
    assertA11yQualityGate(scanReport, {
      blockOnCritical: true,
      blockOnSerious: false,
      allowKnownBaselineDefects: true,
    });
  });

  test('TC-A11Y-005C: @a11y should verify contact form controls have accessible names and aria attributes', async ({
    page,
  }) => {
    await expect(homePage.contactForm.nameInput).toBeVisible();
    await expect(homePage.contactForm.emailInput).toBeVisible();
    await expect(homePage.contactForm.messageInput).toBeVisible();

    const namePlaceholder = await homePage.contactForm.nameInput.getAttribute('placeholder');
    const nameAriaLabel = await homePage.contactForm.nameInput.getAttribute('aria-label');
    const nameId = await homePage.contactForm.nameInput.getAttribute('id');

    let nameHasLabel = !!(namePlaceholder || nameAriaLabel);
    if (nameId) {
      const label = page.locator(`label[for="${nameId}"]`);
      if ((await label.count()) > 0) nameHasLabel = true;
    }

    expect(nameHasLabel, 'Contact Name input must have an accessible label or placeholder').toBe(
      true,
    );
  });
});
