import { FrameLocator } from '@playwright/test'

const selectors = {
  screen: '[data-qa="active-screen-payment-method"]',
  coverFeeCheckbox: '[data-qa="cover-fee-checkbox"]',
  creditCardButton: '[data-qa="cc-button"]',
}

export default class PaymentOptionScreen {
  readonly iframe: FrameLocator

  constructor(widgetIframe: FrameLocator) {
    this.iframe = widgetIframe.first()
  }

  async isOpen(): Promise<boolean> {
    const screen = this.iframe.locator(selectors.screen)
    await screen.waitFor({ state: 'visible' })
    return screen.isVisible()
  }

  async clickCoverFeeCheckbox(): Promise<void> {
    await this.iframe.locator(selectors.coverFeeCheckbox).click()
  }

  async clickCreditCardButton(): Promise<void> {
    await this.iframe.locator(selectors.creditCardButton).click()
  }
}
