import { Schema } from "mongoose";

const userSchema = new Schema({
  telegramId: Number,
  firstName: String,
  lastName: String,
  email: String,
  telegramLogin: String,
  isUsedTestPeriod: Boolean,
  isHaveSupscription: Boolean,
  dateEndSubscription: String,
  apiKeyWildberries: String,
});

export default userSchema;
