import { defineConfig, devices } from '@playwright/test'
import { config } from 'dotenv'

config()
const maxWorkers = process.env.MAX_WORKERS
const retries = process.env.RETRIES
const viewport = {
  width: 1366,
  height: 768,
}

export default defineConfig({
  workers: Number(maxWorkers),
  retries: Number(retries),
  timeout: 1000 * 20,
  reporter: [['list'], ['html', { open: 'never' }]],
  testDir: 'src/tests',
  testMatch: ['**/src/tests/**/**.spec.ts'],
  use: {
    trace: 'on-first-retry',
    video: 'on-first-retry',
    screenshot: 'only-on-failure',
    baseURL: 'https://data.fundraiseup.com/qa-test-7R58U3/',
    actionTimeout: 1000 * 10,
    browserName: 'chromium',
    headless: false,
    locale: 'en-GB',
    ignoreHTTPSErrors: false,
    launchOptions: {
      slowMo: 150,
    },
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        viewport,
      },
    },
    {
      name: 'mobile',
      use: { ...devices['Pixel 5'] },
    },
  ],
  outputDir: 'test-results',
})
