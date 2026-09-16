import { test, expect } from '@playwright/test';
import { MediumApiClient, MediumApiResponse } from '../../src/api/clients/mediumApiClient';

/**
 * API Contract Test Suite for SUT `/api/medium` Endpoint (@api)
 * Validates HTTP response status, headers, JSON payload structure, and method safety.
 */
test.describe('Medium API Proxy Contract Tests (@api)', () => {
  test('TC-API-001: @api should return HTTP 200 OK and valid JSON article structure', async ({
    request,
  }) => {
    const client = new MediumApiClient(request);
    const response = await client.getArticles();

    expect(response.status()).toBe(200);

    const body: MediumApiResponse = await response.json();
    expect(body).toBeDefined();
    const articles = body.blogs || body.items || [];
    expect(Array.isArray(articles)).toBe(true);

    if (articles.length > 0) {
      const firstArticle = articles[0];
      expect(firstArticle).toHaveProperty('title');
      const articleUrl = firstArticle.url || firstArticle.link || firstArticle.id;
      expect(typeof firstArticle.title).toBe('string');
      expect(typeof articleUrl).toBe('string');
    }
  });

  test('TC-API-002: @api should return JSON content-type response header', async ({ request }) => {
    const client = new MediumApiClient(request);
    const response = await client.getArticles();

    expect(response.status()).toBe(200);
    const contentType = response.headers()['content-type'];
    expect(contentType).toContain('application/json');
  });

  test('TC-API-003: @api should handle unsupported HTTP methods gracefully', async ({ request }) => {
    const client = new MediumApiClient(request);
    const response = await client.sendUnsupportedMethod('post');

    // SUT returns 405 Method Not Allowed or handles POST safely
    expect([200, 400, 404, 405]).toContain(response.status());
  });
});
