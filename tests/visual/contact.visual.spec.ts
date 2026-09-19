import { test, expect } from '@playwright/test';
import { HomePage } from '../../src/pages/HomePage';

test.describe('Contact Form Visual Regression Suite (@visual)', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.open();
    await homePage.navbar.clickSectionLink('contact');
  });

  test('TC-VIS-005: @visual should match contact section visual baseline snapshot', async ({
    page,
  }) => {
    const contactSection = page.locator('#contact, form').first();
    await expect(contactSection).toBeVisible();
    await expect(contactSection).toHaveScreenshot('contact-section.png', {
      maxDiffPixelRatio: 0.05,
    });
  });
});
