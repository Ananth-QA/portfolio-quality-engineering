import { Page, Locator, expect } from '@playwright/test';

/**
 * Component Object representing Project Case Study Modal dialog.
 */
export class ProjectModal {
  constructor(private readonly page: Page) {}

  /**
   * Returns underlying Playwright Page reference.
   */
  getPage(): Page {
    return this.page;
  }

  /**
   * Gets modal dialog container locator by project ID.
   */
  getModal(projectId: string): Locator {
    return this.page.getByTestId(`project-modal-${projectId}`);
  }

  /**
   * Gets close button locator by project ID.
   */
  getCloseButton(projectId: string): Locator {
    return this.page.getByTestId(`project-modal-close-${projectId}`);
  }

  /**
   * Closes project detail modal via close button.
   */
  async closeViaButton(projectId: string): Promise<void> {
    await this.getCloseButton(projectId).click();
  }

  /**
   * Closes project detail modal via Escape key.
   */
  async closeViaEscape(): Promise<void> {
    await this.page.keyboard.press('Escape');
  }

  /**
   * Asserts modal dialog is visible.
   */
  async assertModalOpen(projectId: string): Promise<void> {
    await expect(this.getModal(projectId)).toBeVisible();
  }

  /**
   * Asserts modal dialog is closed.
   */
  async assertModalClosed(projectId: string): Promise<void> {
    await expect(this.getModal(projectId)).not.toBeVisible();
  }
}
