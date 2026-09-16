import { defineConfig, devices } from '@playwright/test';
import { envConfig } from './src/config/env.config';

/**
 * Playwright Test Automation Configuration
 * Portfolio Quality Engineering Framework
 */
export default defineConfig({
  testDir: './tests',
  timeout: 45000,
  expect: {
    timeout: 10000,
  },
  fullyParallel: true,
  forbidOnly: envConfig.isCI,
  retries: envConfig.isCI ? 2 : 0,
  workers: 2,
  reporter: [['html', { open: 'never' }], ['list']],
  use: {
    baseURL: envConfig.baseURL,
    headless: envConfig.isHeadless,
    trace: envConfig.traceMode,
    screenshot: envConfig.screenshotMode,
    video: envConfig.videoMode,
    actionTimeout: 10000,
    navigationTimeout: 15000,
  },
  projects: [
    {
      name: 'Desktop Chrome',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'Desktop Firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'Desktop Safari',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },
  ],
  outputDir: 'test-results/',
});
