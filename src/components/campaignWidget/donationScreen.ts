import { PaymentPlan } from 'types'
import { FrameLocator } from '@playwright/test'

const selectors = {
  screen: '[data-qa="fiat-donate-form"]',
  giveOnceButton:
    '[data-qa="fiat-donate-form"] [data-testid="left-button-label"]',
  giveMonthlyButton:
    '[data-qa="fiat-donate-form"] [data-testid="right-button-label"]',
  amountInput: '[data-testid="price-input"]',
  donateButton: '[data-qa="donate-button"]',
}

export default class DonationScreen {
  readonly iframe: FrameLocator

  constructor(widgetIframe: FrameLocator) {
    this.iframe = widgetIframe.first()
  }

  async isOpen(): Promise<boolean> {
    const screen = this.iframe.locator(selectors.screen)
    await screen.waitFor({ state: 'visible' })
    return screen.isVisible()
  }

  async chooseDonationPlan(plan: PaymentPlan): Promise<void> {
    if (plan === PaymentPlan.once) {
      await this.iframe.locator(selectors.giveOnceButton).click()
    } else {
      await this.iframe.locator(selectors.giveMonthlyButton).click()
    }
  }

  async enterAmount(amount: string): Promise<void> {
    await this.iframe.locator(selectors.amountInput).fill(amount)
  }

  async clickDonateButton(): Promise<void> {
    await this.iframe.locator(selectors.donateButton).click()
  }
}
