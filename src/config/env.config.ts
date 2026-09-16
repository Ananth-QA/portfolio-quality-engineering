import * as dotenv from 'dotenv';
import * as path from 'path';

// Load local .env file if available
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

/**
 * Validates and normalizes target Base URL from environment configuration.
 * Throws explicit, developer-friendly errors if BASE_URL is missing or malformed.
 */
export function getValidatedBaseUrl(): string {
  const rawUrl = process.env.BASE_URL?.trim();

  if (!rawUrl) {
    throw new Error(
      'BASE_URL is not configured. Please provide BASE_URL through environment configuration or .env file.',
    );
  }

  try {
    const parsedUrl = new URL(rawUrl);
    if (parsedUrl.protocol !== 'http:' && parsedUrl.protocol !== 'https:') {
      throw new Error(`BASE_URL must use HTTP or HTTPS protocol. Received: ${parsedUrl.protocol}`);
    }
    return parsedUrl.toString().replace(/\/$/, '');
  } catch (err: unknown) {
    if (err instanceof Error && err.message.includes('HTTP or HTTPS')) {
      throw err;
    }
    throw new Error(`BASE_URL is invalid: "${rawUrl}". Must be a valid HTTP or HTTPS URL.`);
  }
}

/**
 * Centralized, validated environment configuration abstraction.
 */
export const envConfig = {
  get baseURL(): string {
    return getValidatedBaseUrl();
  },
  environment: process.env.TEST_ENV || 'production',
  mediumApiEndpoint: process.env.MEDIUM_API_ENDPOINT || '/api/medium',
  isHeadless: process.env.HEADLESS !== 'false',
  traceMode: (process.env.TRACE_MODE || 'retain-on-failure') as
    'off' | 'on' | 'retain-on-failure' | 'on-first-retry',
  screenshotMode: (process.env.SCREENSHOT_MODE || 'only-on-failure') as
    'off' | 'on' | 'only-on-failure',
  videoMode: (process.env.VIDEO_MODE || 'retain-on-failure') as
    'off' | 'on' | 'retain-on-failure' | 'on-first-retry',
  isCI: !!process.env.CI,
};
