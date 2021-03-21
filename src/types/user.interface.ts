interface User {
  _id?: string;
  telegramId?: number;
  firstName?: string;
  lastName?: string;
  isProcessBuyedSubscription?: boolean;
  messageIdPaymentMessage?: number;
  messageIdNotificationsAboutDeleteMessage?: number;
  telegramLogin?: string;
  isUsedTestPeriod?: boolean;
  dateEndSubscription?: string;
  apiKeyWildberries?: string;
  __v?: number;
}

export default User;
