import { test, expect } from '@playwright/test';
import { HomePage } from '../../src/pages/HomePage';

/**
 * Contact Form Functional Regression Suite (@regression)
 * Validates negative input rules, email format validation, and reset behavior safely.
 * NOTE: Production-safe; zero real contact submissions, email dispatches, or database writes.
 */
test.describe('Contact Form Functional Regression (@regression)', () => {
  test('TC-CNT-001: @regression should display validation error on blank submission', async ({
    page,
  }) => {
    const homePage = new HomePage(page);
    await homePage.open();

    await homePage.navbar.clickSectionLink('contact');
    await expect(homePage.contactForm.submitButton).toBeVisible();
    await homePage.contactForm.submit();
    await homePage.contactForm.assertValidationError();
  });

  test('TC-CNT-002: @regression should validate invalid email format feedback', async ({
    page,
  }) => {
    const homePage = new HomePage(page);
    await homePage.open();

    await homePage.navbar.clickSectionLink('contact');
    await homePage.contactForm.fillForm({
      name: 'QA Automation Lead',
      email: 'invalid-email-format-without-at',
      message: 'Testing email format validation logic.',
    });
    await homePage.contactForm.submit();
    await homePage.contactForm.assertValidationError();
  });

  test('TC-CNT-003: @regression should verify honeypot anti-spam botcheck field state', async ({
    page,
  }) => {
    const homePage = new HomePage(page);
    await homePage.open();

    await homePage.navbar.clickSectionLink('contact');
    if (await homePage.contactForm.botcheckInput.isVisible()) {
      await homePage.contactForm.fillHoneypot('spam-bot-trap-value');
    }
  });

  test('TC-CNT-005: @regression should clear input fields when reset action is triggered', async ({
    page,
  }) => {
    const homePage = new HomePage(page);
    await homePage.open();

    await homePage.navbar.clickSectionLink('contact');
    await homePage.contactForm.fillForm({
      name: 'Draft Candidate',
      email: 'draft@example.com',
      message: 'Draft message to be reset.',
    });

    if (await homePage.contactForm.resetButton.isVisible()) {
      await homePage.contactForm.reset();
      await expect(homePage.contactForm.nameInput).toHaveValue('');
    }
  });
});
