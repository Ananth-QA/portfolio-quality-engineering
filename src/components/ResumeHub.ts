import { Page, Locator, expect, Download } from '@playwright/test';

/**
 * Component Object representing Resume Hub section.
 */
export class ResumeHub {
  readonly downloadButton: Locator;
  readonly previewButton: Locator;

  constructor(private readonly page: Page) {
    this.downloadButton = page.getByTestId('resume-download-button');
    this.previewButton = page.getByTestId('resume-preview-button');
  }

  /**
   * Clicks Download Resume and returns Download event promise.
   */
  async triggerResumeDownload(): Promise<Download> {
    const downloadPromise = this.page.waitForEvent('download');
    await this.downloadButton.click();
    return downloadPromise;
  }

  /**
   * Clicks Preview PDF to open preview modal.
   */
  async openPdfPreviewModal(): Promise<void> {
    await this.previewButton.click();
  }

  /**
   * Asserts PDF iframe viewer visibility.
   */
  async assertPdfIframeVisible(): Promise<void> {
    const iframe = this.page.locator('iframe[src*="resume.pdf"]');
    await expect(iframe).toBeVisible();
  }
}
