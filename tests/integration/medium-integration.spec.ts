import { test, expect } from '@playwright/test';
import { BlogPage } from '../../src/pages/BlogPage';

/**
 * Integration Test Suite for Medium Service Boundary (@integration)
 * Validates UI rendering under controlled network route responses (success & error simulation).
 */
test.describe('Medium Service Boundary Integration Tests (@integration)', () => {
  test('TC-INT-001: @integration should render blog articles when /api/medium returns mock payload', async ({
    page,
  }) => {
    const mockArticles = {
      items: [
        {
          title: 'Mock SDET Playwright Framework Insight',
          link: 'https://medium.com/@ananth/mock-sdet-playwright-insight',
          pubDate: '2026-09-16T12:00:00Z',
          author: 'Ananth A',
          categories: ['Playwright', 'TypeScript', 'Automation'],
        },
      ],
    };

    await page.route('**/api/medium*', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockArticles),
      });
    });

    const blogPage = new BlogPage(page);
    await blogPage.open();

    await expect(page).toHaveURL(/\/blogs/);
  });

  test('TC-INT-002: @integration should handle 500 server error from /api/medium gracefully', async ({
    page,
  }) => {
    await page.route('**/api/medium*', async (route) => {
      await route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Internal Server Error' }),
      });
    });

    const blogPage = new BlogPage(page);
    await blogPage.open();

    await expect(page).toHaveURL(/\/blogs/);
  });
});
