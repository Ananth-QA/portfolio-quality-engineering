import { test, expect } from '@playwright/test';
import { envConfig, getValidatedBaseUrl } from '../src/config/env.config';
import { HomePage } from '../src/pages/HomePage';
import { BlogPage } from '../src/pages/BlogPage';
import { NotFoundPage } from '../src/pages/NotFoundPage';

/**
 * Framework Initialization, Environment Config & Page Object Architecture Validation Test
 * NOTE: Architectural validation suite; does NOT represent functional portfolio test coverage.
 */
test.describe('Framework Initialization & Architecture (@bootstrap)', () => {
  test('BOOTSTRAP-01: Playwright Engine & Browser Initialization Check', async ({ page }) => {
    await page.goto(envConfig.baseURL, { waitUntil: 'commit' });
    await page.waitForLoadState('domcontentloaded');
    expect(page.url()).toContain('ananth-portfolio');
  });

  test('BOOTSTRAP-02: Environment Configuration Validation Logic', async () => {
    const validUrl = getValidatedBaseUrl();
    expect(validUrl).toContain('https://');

    const originalUrl = process.env.BASE_URL;

    try {
      delete process.env.BASE_URL;
      expect(() => getValidatedBaseUrl()).toThrow('BASE_URL is not configured');

      process.env.BASE_URL = 'not-a-valid-url';
      expect(() => getValidatedBaseUrl()).toThrow('BASE_URL is invalid');

      process.env.BASE_URL = 'ftp://invalid-protocol.com';
      expect(() => getValidatedBaseUrl()).toThrow('must use HTTP or HTTPS protocol');
    } finally {
      process.env.BASE_URL = originalUrl;
    }
  });

  test('BOOTSTRAP-03: Page Object & Component Architecture Instantiation Check', async ({
    page,
  }) => {
    const homePage = new HomePage(page);
    const blogPage = new BlogPage(page);
    const notFoundPage = new NotFoundPage(page);

    await homePage.open();
    expect(await homePage.getUrl()).toContain('ananth-portfolio');
    await homePage.navbar.assertHeaderVisible();

    expect(blogPage).toBeDefined();
    expect(notFoundPage).toBeDefined();
  });
});
