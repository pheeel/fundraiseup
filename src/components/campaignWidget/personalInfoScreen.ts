import { FrameLocator } from '@playwright/test'

const selectors = {
  screen: '[data-qa="active-screen-privacy"]',
  firstNameInput: '[data-testid="privacy-first-name-input"]',
  lastNameInput: '[data-testid="privacy-last-name-input"]',
  emailInput: '[data-testid="privacy-email-input"]',
  donateButton: '[data-testid="pay-button"]',
}

export default class PersonalInfoScreen {
  readonly iframe: FrameLocator

  constructor(widgetIframe: FrameLocator) {
    this.iframe = widgetIframe.first()
  }

  async isOpen(): Promise<boolean> {
    const screen = this.iframe.locator(selectors.screen)
    await screen.waitFor({ state: 'visible' })
    return screen.isVisible()
  }

  async enterFirstName(firstName: string): Promise<void> {
    await this.iframe.locator(selectors.firstNameInput).fill(firstName)
  }

  async enterLastName(lastName: string): Promise<void> {
    await this.iframe.locator(selectors.lastNameInput).fill(lastName)
  }

  async enterEmail(email: string): Promise<void> {
    await this.iframe.locator(selectors.emailInput).fill(email)
  }

  async clickDonateButton(): Promise<void> {
    await this.iframe.locator(selectors.donateButton).click()
  }
}
