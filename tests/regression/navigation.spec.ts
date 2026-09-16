import { test, expect } from '@playwright/test';
import { HomePage } from '../../src/pages/HomePage';

/**
 * Navigation Functional Regression Suite (@regression)
 * Validates section scrolling and navigation component interaction.
 */
test.describe('Navigation Functional Regression (@regression)', () => {
  test('TC-NAV-001: @regression should navigate to sections via navbar link clicks', async ({
    page,
  }) => {
    const homePage = new HomePage(page);
    await homePage.open();

    await homePage.navbar.assertHeaderVisible();
    await homePage.navbar.clickSectionLink('projects');
    await expect(page.locator('#projects').first()).toBeVisible();

    await homePage.navbar.clickSectionLink('contact');
    await expect(page.locator('#contact').first()).toBeVisible();
  });

  test('TC-NAV-002: @regression should maintain header navigation visibility across scrolling', async ({
    page,
  }) => {
    const homePage = new HomePage(page);
    await homePage.open();

    await page.evaluate(() => window.scrollTo(0, 1000));
    await homePage.navbar.assertHeaderVisible();
  });
});
