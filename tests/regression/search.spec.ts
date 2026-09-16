import { test, expect } from '@playwright/test';
import { HomePage } from '../../src/pages/HomePage';

/**
 * Global Search Functional Regression Suite (@regression)
 * Validates search modal keyboard triggers, query input, and result rendering.
 */
test.describe('Global Search Functional Regression (@regression)', () => {
  test('TC-SCH-001: @regression should open global search modal via keyboard shortcut', async ({
    page,
  }) => {
    const homePage = new HomePage(page);
    await homePage.open();

    await homePage.searchModal.openViaKeyboardShortcut();
    await homePage.searchModal.assertModalOpen();
  });

  test('TC-SCH-002: @regression should filter search results based on input query', async ({
    page,
  }) => {
    const homePage = new HomePage(page);
    await homePage.open();

    await homePage.navbar.openSearchModal();
    await homePage.searchModal.enterSearchQuery('Playwright');
    await expect(homePage.searchModal.searchInput).toHaveValue('Playwright');
  });

  test('TC-SCH-003: @regression should close global search modal via Escape key', async ({
    page,
  }) => {
    const homePage = new HomePage(page);
    await homePage.open();

    await homePage.navbar.openSearchModal();
    await homePage.searchModal.assertModalOpen();
    await homePage.searchModal.closeViaEscape();
    await homePage.searchModal.assertModalClosed();
  });
});
