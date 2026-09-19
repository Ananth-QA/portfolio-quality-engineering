import { Page, Locator, expect } from '@playwright/test';

/**
 * Component Object representing Global Search Modal dialog.
 */
export class GlobalSearchModal {
  readonly modalDialog: Locator;
  readonly searchInput: Locator;
  readonly noResultsMessage: Locator;

  constructor(private readonly page: Page) {
    this.modalDialog = page.getByTestId('global-search-modal');
    this.searchInput = page.getByTestId('global-search-input');
    this.noResultsMessage = page.getByTestId('global-search-no-results');
  }

  /**
   * Triggers search modal via keyboard shortcut Ctrl+K / Cmd+K.
   */
  async openViaKeyboardShortcut(): Promise<void> {
    const isMac = process.platform === 'darwin';
    await this.page.keyboard.press(isMac ? 'Meta+k' : 'Control+k');
  }

  /**
   * Types search query into input field.
   */
  async enterSearchQuery(query: string): Promise<void> {
    await this.searchInput.fill(query);
  }

  /**
   * Navigates results via arrow key and selects with Enter.
   */
  async selectResultViaKeyboard(): Promise<void> {
    await this.page.keyboard.press('ArrowDown');
    await this.page.keyboard.press('Enter');
  }

  /**
   * Closes search modal via Escape key.
   */
  async closeViaEscape(): Promise<void> {
    await this.page.keyboard.press('Escape');
  }

  /**
   * Asserts modal dialog is open and input is focused.
   * Maintains strict assertion integrity without conditional fallbacks.
   */
  async assertModalOpen(): Promise<void> {
    await expect(this.modalDialog).toBeVisible();
    await expect(this.searchInput).toBeVisible();
    await expect(this.searchInput).toBeFocused();
  }

  /**
   * Asserts modal dialog is closed.
   */
  async assertModalClosed(): Promise<void> {
    await expect(this.modalDialog).not.toBeVisible();
  }
}

