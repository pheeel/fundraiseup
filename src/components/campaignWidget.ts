import { Page } from '@playwright/test'
import CreditCardScreen from './campaignWidget/creditCardScreen'
import DonationScreen from './campaignWidget/donationScreen'
import PaymentOptionScreen from './campaignWidget/paymentOptionScreen'
import PersonalInfoScreen from './campaignWidget/personalInfoScreen'
import { FrameLocator } from '@playwright/test'

const selectors = {
  closeButton: '[data-qa="global-close"]',
  widgetIframe: 'iframe[title="Donation Widget"]',
}

export default class CampaignWidget {
  private readonly page: Page
  readonly creditCardInfoScreen: CreditCardScreen
  readonly donationScreen: DonationScreen
  readonly paymentOptionScreen: PaymentOptionScreen
  readonly personalInfoScreen: PersonalInfoScreen
  readonly widgetIframe: FrameLocator

  constructor(page: Page) {
    this.page = page
    this.widgetIframe = page.frameLocator(selectors.widgetIframe)
    this.creditCardInfoScreen = new CreditCardScreen(this.widgetIframe)
    this.donationScreen = new DonationScreen(this.widgetIframe)
    this.paymentOptionScreen = new PaymentOptionScreen(this.widgetIframe)
    this.personalInfoScreen = new PersonalInfoScreen(this.widgetIframe)
  }

  async clickCloseButton(): Promise<void> {
    await this.page.click(selectors.closeButton)
  }
}
