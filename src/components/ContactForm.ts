import { Page, Locator, expect } from '@playwright/test';

/**
 * Component Object representing SaaS Contact Form.
 */
export class ContactForm {
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly subjectInput: Locator;
  readonly messageInput: Locator;
  readonly botcheckInput: Locator;
  readonly submitButton: Locator;
  readonly resetButton: Locator;
  readonly successToast: Locator;
  readonly errorToast: Locator;

  constructor(private readonly page: Page) {
    this.nameInput = page.getByTestId('contact-name');
    this.emailInput = page.getByTestId('contact-email');
    this.subjectInput = page.getByTestId('contact-subject');
    this.messageInput = page.getByTestId('contact-message');
    this.botcheckInput = page.locator('input[name="botcheck"]');
    this.submitButton = page.getByTestId('contact-submit');
    this.resetButton = page.getByTestId('contact-reset');
    this.successToast = page.getByTestId('contact-success');
    this.errorToast = page.getByTestId('contact-error');
  }

  /**
   * Fills contact form input fields.
   */
  async fillForm(data: {
    name?: string;
    email?: string;
    subject?: string;
    message?: string;
  }): Promise<void> {
    if (data.name !== undefined) await this.nameInput.fill(data.name);
    if (data.email !== undefined) await this.emailInput.fill(data.email);
    if (data.subject !== undefined) await this.subjectInput.fill(data.subject);
    if (data.message !== undefined) await this.messageInput.fill(data.message);
  }

  /**
   * Fills hidden honeypot field for anti-spam testing.
   */
  async fillHoneypot(spamValue: string): Promise<void> {
    await this.botcheckInput.evaluate((el: HTMLInputElement, val: string) => {
      el.value = val;
    }, spamValue);
  }

  /**
   * Clicks form submit button after scrolling into view.
   */
  async submit(): Promise<void> {
    await this.submitButton.scrollIntoViewIfNeeded();
    await this.submitButton.click();
  }

  /**
   * Clicks form reset button.
   */
  async reset(): Promise<void> {
    await this.resetButton.click();
  }

  /**
   * Asserts success alert toast is displayed.
   */
  async assertSuccessAlert(): Promise<void> {
    await expect(this.successToast).toBeVisible({ timeout: 10000 });
  }

  /**
   * Asserts inline validation error or error toast is displayed.
   */
  async assertValidationError(): Promise<void> {
    const nameError = this.page.getByTestId('contact-name-error');
    const emailError = this.page.getByTestId('contact-email-error');
    const hasError =
      (await nameError.isVisible()) ||
      (await emailError.isVisible()) ||
      (await this.errorToast.isVisible());
    expect(hasError).toBe(true);
  }
}
