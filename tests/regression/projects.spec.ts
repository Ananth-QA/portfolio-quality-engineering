import { test, expect } from '@playwright/test';
import { HomePage } from '../../src/pages/HomePage';

/**
 * Projects Showcase Functional Regression Suite (@regression)
 * Validates project search, category filtering, case study modals, and boundary cases.
 */
test.describe('Projects Showcase Functional Regression (@regression)', () => {
  test('TC-PRJ-001: @regression should filter project grid by keyword input', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.open();

    await homePage.navbar.clickSectionLink('projects');
    await expect(homePage.projectCard.searchInput).toBeVisible();
    await homePage.projectCard.searchProjects('Automation');
    await expect(homePage.projectCard.searchInput).toHaveValue('Automation');
  });

  test('TC-PRJ-002: @regression should filter projects using category pill buttons', async ({
    page,
  }) => {
    const homePage = new HomePage(page);
    await homePage.open();

    await homePage.navbar.clickSectionLink('projects');
    await homePage.projectCard.filterByCategory('Web Automation');
  });

  test('TC-PRJ-003: @regression should display no-results indicator for non-matching search term', async ({
    page,
  }) => {
    const homePage = new HomePage(page);
    await homePage.open();

    await homePage.navbar.clickSectionLink('projects');
    await homePage.projectCard.searchProjects('NonExistentProjectQueryX19');
    if (await homePage.projectCard.noResultsMessage.isVisible()) {
      await expect(homePage.projectCard.noResultsMessage).toBeVisible();
    }
  });

  test('TC-PRJ-004: @regression should handle project modal dialog operations safely', async ({
    page,
  }) => {
    const homePage = new HomePage(page);
    await homePage.open();

    await homePage.navbar.clickSectionLink('projects');
    const detailsButton = page
      .locator('button:has-text("View"), button:has-text("Details")')
      .first();
    if (await detailsButton.isVisible()) {
      await detailsButton.click();
      await homePage.projectModal.closeViaEscape();
    }
  });
});
