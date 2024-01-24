import test, { expect } from 'fixtures'
import { CREDIT_CARD_DETAILS, PERSONAL_INFO, CARD_ERRORS } from 'consts'
import { PaymentPlan } from 'types'

const donationAmount = '100'
test.describe('Donation With Card - DUPLICATE', () => {
  test('Check Failed Transaction', async ({ mainPage, campaignWidget }) => {
    await test.step('Open Donation Widget', async () => {
      await mainPage.clickGiveNowButton()
      expect(await campaignWidget.donationScreen.isOpen()).toBeTruthy()
    })

    await test.step('Set Monthly Donation Plan and Amount', async () => {
      await campaignWidget.donationScreen.chooseDonationPlan(
        PaymentPlan.monthly
      )
      await campaignWidget.donationScreen.enterAmount(donationAmount)
      await campaignWidget.donationScreen.clickDonateButton()
      expect(await campaignWidget.paymentOptionScreen.isOpen()).toBeTruthy()
    })

    await test.step('Uncheck Fee and Choose Credit Card Payment Method', async () => {
      await campaignWidget.paymentOptionScreen.clickCoverFeeCheckbox()
      await campaignWidget.paymentOptionScreen.clickCreditCardButton()
      expect(await campaignWidget.creditCardInfoScreen.isOpen()).toBeTruthy()
    })

    await test.step('Enter Credit Card Details', async () => {
      await campaignWidget.creditCardInfoScreen.enterCardNumber(
        CREDIT_CARD_DETAILS.number
      )
      await campaignWidget.creditCardInfoScreen.enterCardDate(
        `${CREDIT_CARD_DETAILS.month}${CREDIT_CARD_DETAILS.year}`
      )
      await campaignWidget.creditCardInfoScreen.enterCardCVC(
        CREDIT_CARD_DETAILS.cvc
      )
      await campaignWidget.creditCardInfoScreen.clickContinueButton()
      expect(await campaignWidget.personalInfoScreen.isOpen()).toBeTruthy()
    })

    await test.step('Enter Personal Info', async () => {
      await campaignWidget.personalInfoScreen.enterFirstName(
        PERSONAL_INFO.firstName
      )
      await campaignWidget.personalInfoScreen.enterLastName(
        PERSONAL_INFO.lastName
      )
      await campaignWidget.personalInfoScreen.enterEmail(PERSONAL_INFO.email)
    })

    await test.step('Get Credit Card Payment Error', async () => {
      await campaignWidget.personalInfoScreen.clickDonateButton()
      await campaignWidget.creditCardInfoScreen.waitForErrorTooltip()
      expect(await campaignWidget.creditCardInfoScreen.isOpen()).toBeTruthy()
      expect(
        await campaignWidget.creditCardInfoScreen.getErrorTooltipTitleText()
      ).toBe(CARD_ERRORS.cardDeclined)
      expect(
        await campaignWidget.creditCardInfoScreen.getErrorTooltipMessageText()
      ).toBe(CARD_ERRORS.testCardDeclined)
    })
  })
})
