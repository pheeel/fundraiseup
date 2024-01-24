import { Page } from '@playwright/test'

const selectors = {
  buttonIframe: 'iframe[title="Donate Button"]',
  giveNowButton: '[data-qa="fun-element"]',
}

export default class MainPage {
  private readonly page: Page

  constructor(page: Page) {
    this.page = page
  }

  async clickGiveNowButton(): Promise<void> {
    const iframe = this.page.frameLocator(selectors.buttonIframe)
    const giveNowButton = iframe.locator(selectors.giveNowButton)
    await giveNowButton.click()
  }
}
