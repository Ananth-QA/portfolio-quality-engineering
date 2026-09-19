import { test, expect } from '@playwright/test';
import { HomePage } from '../../src/pages/HomePage';
import { BlogPage } from '../../src/pages/BlogPage';

test.describe('Responsive Layout & Viewport Behavior Suite (@responsive)', () => {
  test.describe('Desktop Viewport (1280x720)', () => {
    test.use({ viewport: { width: 1280, height: 720 } });

    test('TC-RSP-001: @responsive desktop viewport should display header navigation and measure scroll overflow', async ({
      page,
    }) => {
      const homePage = new HomePage(page);
      await homePage.open();

      await homePage.navbar.assertHeaderVisible();
      const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
      const innerWidth = await page.evaluate(() => window.innerWidth);
      const overflow = Math.max(0, scrollWidth - innerWidth);

      console.log(
        `[DESKTOP RESPONSIVE MEASUREMENT] Viewport: 1280x720 | scrollWidth: ${scrollWidth}px | overflow: ${overflow}px`,
      );
      expect(overflow, `Desktop overflow measured (${overflow}px)`).toBeLessThanOrEqual(30);
    });
  });

  test.describe('Tablet Viewport (768x1024)', () => {
    test.use({ viewport: { width: 768, height: 1024 } });

    test('TC-RSP-002: @responsive tablet viewport should stack projects grid cleanly and maintain accessible controls', async ({
      page,
    }) => {
      const homePage = new HomePage(page);
      await homePage.open();

      await homePage.navbar.clickSectionLink('projects');
      await expect(homePage.projectCard.searchInput).toBeVisible();

      const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
      const innerWidth = await page.evaluate(() => window.innerWidth);
      const overflow = Math.max(0, scrollWidth - innerWidth);

      console.log(
        `[TABLET RESPONSIVE MEASUREMENT] Viewport: 768x1024 | scrollWidth: ${scrollWidth}px | overflow: ${overflow}px`,
      );
      expect(overflow, `Tablet overflow measured (${overflow}px)`).toBeLessThanOrEqual(30);
    });
  });

  test.describe('Mobile Viewport (390x844)', () => {
    test.use({ viewport: { width: 390, height: 844 } });

    test('TC-RSP-003: @responsive mobile viewport should toggle mobile navigation drawer and evaluate mobile overflow', async ({
      page,
    }) => {
      const homePage = new HomePage(page);
      await homePage.open();

      if (await homePage.navbar.mobileMenuButton.isVisible()) {
        await homePage.navbar.toggleMobileMenu();
        await expect(homePage.navbar.mobileNavDrawer).toBeVisible();
      }

      const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
      const innerWidth = await page.evaluate(() => window.innerWidth);
      const overflow = Math.max(0, scrollWidth - innerWidth);

      console.log(
        `[MOBILE RESPONSIVE MEASUREMENT] Viewport: 390x844 | scrollWidth: ${scrollWidth}px | overflow: ${overflow}px`,
      );
      expect(overflow, `Mobile overflow measured (${overflow}px)`).toBeLessThanOrEqual(50);
    });

    test('TC-RSP-004: @responsive mobile viewport should render blog platform without layout clipping', async ({
      page,
    }) => {
      const blogPage = new BlogPage(page);
      await blogPage.open();

      await expect(page).toHaveURL(/\/blogs/);
      const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
      const innerWidth = await page.evaluate(() => window.innerWidth);
      const overflow = Math.max(0, scrollWidth - innerWidth);

      console.log(
        `[MOBILE BLOG RESPONSIVE MEASUREMENT] Viewport: 390x844 | scrollWidth: ${scrollWidth}px | overflow: ${overflow}px`,
      );
      expect(overflow, `Mobile blog overflow measured (${overflow}px)`).toBeLessThanOrEqual(50);
    });
  });
});
