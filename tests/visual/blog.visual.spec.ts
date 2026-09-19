import { test, expect } from '@playwright/test';
import { BlogPage } from '../../src/pages/BlogPage';

test.describe('Blog Platform Visual Regression Suite (@visual)', () => {
  let blogPage: BlogPage;

  test.beforeEach(async ({ page }) => {
    blogPage = new BlogPage(page);
    await blogPage.open();
  });

  test('TC-VIS-004: @visual should match blog platform page visual baseline snapshot', async ({
    page,
  }) => {
    await expect(page).toHaveURL(/\/blogs/);
    const mainContent = page.locator('main').first();
    await expect(mainContent).toBeVisible();
    await expect(mainContent).toHaveScreenshot('blog-page-main.png', {
      maxDiffPixelRatio: 0.05,
    });
  });
});
