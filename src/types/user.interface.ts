interface User {
  _id?: string;
  telegramId?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  telegramLogin?: string;
  isUsedTestPeriod?: boolean;
  dateEndSubscription?: string;
  apiKeyWildberries?: string;
  __v?: number;
}

export default User;
