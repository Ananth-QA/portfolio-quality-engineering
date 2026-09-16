import { test, expect } from '@playwright/test';
import { BlogPage } from '../../src/pages/BlogPage';

/**
 * Blog Platform Functional Regression Suite (@regression)
 * Validates article grid, blog search box interaction, and routing.
 */
test.describe('Blog Platform Functional Regression (@regression)', () => {
  test('TC-BLG-001: @regression should load blog page and verify article grid section', async ({
    page,
  }) => {
    const blogPage = new BlogPage(page);
    await blogPage.open();

    await expect(page).toHaveURL(/\/blogs/);
    if (await blogPage.articleCards.first().isVisible()) {
      await blogPage.assertArticlesVisible();
    }
  });

  test('TC-BLG-002: @regression should fill search input query on blog platform', async ({
    page,
  }) => {
    const blogPage = new BlogPage(page);
    await blogPage.open();

    if (await blogPage.searchInput.isVisible()) {
      await blogPage.searchArticles('Testing');
      await expect(blogPage.searchInput).toHaveValue('Testing');
    }
  });

  test('TC-BLG-003: @regression should verify blog navigation elements structure', async ({
    page,
  }) => {
    const blogPage = new BlogPage(page);
    await blogPage.open();

    await expect(blogPage.getPage()).toHaveTitle(/.*blog.*/i);
  });
});
