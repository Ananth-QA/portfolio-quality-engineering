import { test, expect } from '@playwright/test';
import { HomePage } from '../../src/pages/HomePage';

test.describe('Projects Visual Regression Suite (@visual)', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.open();
    await homePage.navbar.clickSectionLink('projects');
  });

  test('TC-VIS-003: @visual should match projects section grid visual baseline snapshot', async ({
    page,
  }) => {
    const projectsSection = page.locator('#projects').first();
    await expect(projectsSection).toBeVisible();
    await expect(projectsSection).toHaveScreenshot('projects-section.png', {
      maxDiffPixelRatio: 0.05,
    });
  });
});
