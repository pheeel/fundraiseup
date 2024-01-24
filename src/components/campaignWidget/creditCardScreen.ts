import { FrameLocator } from '@playwright/test'

const selectors = {
  screen: '[data-qa="active-screen-credit-card"]',
  cardNumberInput: 'input[placeholder="Card number"]',
  cardDateInput: 'input[placeholder="MM / YY"]',
  cardCVCInput: 'input[placeholder="CVC"]',
  continueButton: '[data-qa="card-continue"]',
  errorTooltip: '[data-testid*="tooltip-"][data-testid*="error-alert"]',
  errorTooltipTitle:
    '[data-testid*="tooltip-"][data-testid*="error-alert"] [data-qa="card-continue-error-title"]',
  errorTooltipMessage:
    '[data-testid*="tooltip-"][data-testid*="error-alert"] [data-qa="card-continue-error-message"]',
  stripeIframes: {
    cardNumber: 'iframe[name^="__privateStripeFrame"][title*="card number"]',
    cardDate: 'iframe[name^="__privateStripeFrame"][title*="expiration date"]',
    cardCVC: 'iframe[name^="__privateStripeFrame"][title*="CVC"]',
  },
}

export default class CreditCardScreen {
  readonly iframe: FrameLocator

  constructor(widgetIframe: FrameLocator) {
    this.iframe = widgetIframe.first()
  }

  async isOpen(): Promise<boolean> {
    const screen = this.iframe.locator(selectors.screen)
    await screen.waitFor({ state: 'visible' })
    return screen.isVisible()
  }

  async enterCardNumber(cardNumber: string): Promise<void> {
    const stripeFrame = this.iframe
      .frameLocator(selectors.stripeIframes.cardNumber)
      .first()
    await stripeFrame.locator(selectors.cardNumberInput).fill(cardNumber)
  }

  async enterCardDate(cardDate: string): Promise<void> {
    const cardDateIframe = this.iframe
      .frameLocator(selectors.stripeIframes.cardDate)
      .first()
    await cardDateIframe.locator(selectors.cardDateInput).fill(cardDate)
  }

  async enterCardCVC(cardCVC: string): Promise<void> {
    const cartCVCIframe = this.iframe
      .frameLocator(selectors.stripeIframes.cardCVC)
      .first()
    await cartCVCIframe.locator(selectors.cardCVCInput).fill(cardCVC)
  }

  async clickContinueButton(): Promise<void> {
    await this.iframe.locator(selectors.continueButton).click()
  }

  async waitForErrorTooltip(): Promise<void> {
    await this.iframe
      .locator(selectors.errorTooltip)
      .waitFor({ state: 'visible' })
  }

  async getErrorTooltipTitleText(): Promise<string | null> {
    return this.iframe.locator(selectors.errorTooltipTitle).textContent()
  }

  async getErrorTooltipMessageText(): Promise<string | null> {
    return this.iframe.locator(selectors.errorTooltipMessage).textContent()
  }
}
