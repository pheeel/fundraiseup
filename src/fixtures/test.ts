import { test as baseTest } from '@playwright/test'
import { MainPage } from 'pages'
import { CampaignWidget } from 'components'

const test = baseTest.extend<{
  mainPage: MainPage
  campaignWidget: CampaignWidget
}>({
  page: async ({ page }, use) => {
    await page.goto('')
    await use(page)
  },

  mainPage: async ({ page }, use) => {
    await use(new MainPage(page))
  },

  campaignWidget: async ({ page }, use) => {
    await use(new CampaignWidget(page))
  },
})

export default test
export const { expect } = test
