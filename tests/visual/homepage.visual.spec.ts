import { test, expect } from '@playwright/test';
import { HomePage } from '../../src/pages/HomePage';

test.describe('Homepage Visual Regression Suite (@visual)', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.open();
  });

  test('TC-VIS-001: @visual should match homepage hero section visual baseline snapshot', async ({
    page,
  }) => {
    const heroSection = page.locator('main > section').first();
    await expect(heroSection).toBeVisible();
    await expect(heroSection).toHaveScreenshot('homepage-hero.png', {
      maxDiffPixelRatio: 0.05,
    });
  });
});
