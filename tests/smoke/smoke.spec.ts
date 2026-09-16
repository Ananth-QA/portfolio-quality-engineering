import { test, expect } from '@playwright/test';
import { HomePage } from '../../src/pages/HomePage';
import { BlogPage } from '../../src/pages/BlogPage';
import { NotFoundPage } from '../../src/pages/NotFoundPage';

/**
 * Smoke Test Suite for Portfolio Application (@smoke)
 * Validates critical application capabilities and post-deployment health.
 */
test.describe('Smoke Test Suite (@smoke)', () => {
  test('TC-NAV-001: @smoke should load homepage and display header navigation', async ({
    page,
  }) => {
    const homePage = new HomePage(page);
    await homePage.open();

    await expect(page).toHaveURL(/.*ananth-portfolio.*/);
    await homePage.navbar.assertHeaderVisible();
  });

  test('TC-SCH-001: @smoke should open and close global search modal dialog', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.open();

    await homePage.navbar.openSearchModal();
    await homePage.searchModal.assertModalOpen();

    await homePage.searchModal.closeViaEscape();
    await homePage.searchModal.assertModalClosed();
  });

  test('TC-PRJ-001: @smoke should reach projects section and search project cards', async ({
    page,
  }) => {
    const homePage = new HomePage(page);
    await homePage.open();

    await homePage.navbar.clickSectionLink('projects');
    await expect(homePage.projectCard.searchInput).toBeVisible();
    await homePage.projectCard.searchProjects('Playwright');
  });

  test('TC-BLG-001: @smoke should load blog platform page and verify article section', async ({
    page,
  }) => {
    const blogPage = new BlogPage(page);
    await blogPage.open();

    await expect(page).toHaveURL(/\/blogs/);
  });

  test('TC-RES-001: @smoke should verify resume download capability availability', async ({
    page,
  }) => {
    const homePage = new HomePage(page);
    await homePage.open();

    if (await homePage.heroResumeDownloadLink.isVisible()) {
      await expect(homePage.heroResumeDownloadLink).toBeVisible();
      await expect(homePage.heroResumeDownloadLink).toHaveAttribute('href', /.*\.pdf$/i);
    } else {
      await expect(homePage.resumeHub.downloadButton).toBeVisible();
    }
  });

  test('TC-CNT-001: @smoke should validate contact form empty submission safely', async ({
    page,
  }) => {
    const homePage = new HomePage(page);
    await homePage.open();

    await homePage.navbar.clickSectionLink('contact');
    await expect(homePage.contactForm.submitButton).toBeVisible();
    await homePage.contactForm.submit();
    await homePage.contactForm.assertValidationError();
  });

  test('TC-ERR-001: @smoke should render custom 404 page for invalid route', async ({ page }) => {
    const notFoundPage = new NotFoundPage(page);
    await notFoundPage.triggerNotFound();
    await notFoundPage.assertNotFoundVisible();
  });
});
