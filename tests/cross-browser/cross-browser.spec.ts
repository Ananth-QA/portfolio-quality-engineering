import { test, expect } from '@playwright/test';
import { HomePage } from '../../src/pages/HomePage';
import { BlogPage } from '../../src/pages/BlogPage';

test.describe('Cross-Browser Core Journeys Suite (@cross-browser)', () => {
  test('TC-XB-001: @cross-browser should verify homepage header navigation across browser engines', async ({
    page,
  }) => {
    const homePage = new HomePage(page);
    await homePage.open();

    await expect(page).toHaveURL(/.*ananth-portfolio.*/);
    await homePage.navbar.assertHeaderVisible();
    await homePage.navbar.clickSectionLink('projects');
  });

  test('TC-XB-002: @cross-browser should verify global search modal interaction across browser engines', async ({
    page,
  }) => {
    const homePage = new HomePage(page);
    await homePage.open();

    await homePage.navbar.openSearchModal();
    await homePage.searchModal.enterSearchQuery('Playwright');
    await expect(homePage.searchModal.searchInput).toHaveValue('Playwright');
    await homePage.searchModal.closeViaEscape();
  });

  test('TC-XB-003: @cross-browser should verify project card filtering across browser engines', async ({
    page,
  }) => {
    const homePage = new HomePage(page);
    await homePage.open();

    await homePage.navbar.clickSectionLink('projects');
    await expect(homePage.projectCard.searchInput).toBeVisible();
    await homePage.projectCard.searchProjects('Alatron');
  });

  test('TC-XB-004: @cross-browser should verify blog platform navigation across browser engines', async ({
    page,
  }) => {
    const blogPage = new BlogPage(page);
    await blogPage.open();

    await expect(page).toHaveURL(/\/blogs/);
  });

  test('TC-XB-005: @cross-browser should verify contact form validation across browser engines', async ({
    page,
  }) => {
    const homePage = new HomePage(page);
    await homePage.open();

    await homePage.navbar.clickSectionLink('contact');
    await expect(homePage.contactForm.submitButton).toBeVisible();
    await homePage.contactForm.submit();
    await homePage.contactForm.assertValidationError();
  });
});
