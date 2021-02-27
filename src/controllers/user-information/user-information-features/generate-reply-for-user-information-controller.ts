import { User } from "../../../types";
import * as moment from "moment-timezone";

function generateTextForReplyForUserInformationController(user: User) {
  const userInformation = generateUserInformation(user);
  const textForReply = "Вот твои данные: \n" + userInformation + "\n\n";
  return textForReply;
}

function generateUserInformation(user: User) {
  const textForReply =
    `ID в telegram: <b>${user.telegramId}</b>\n` +
    `Имя и Фамилия: <b>${user.firstName} ${user.lastName}</b>\n` +
    `Логин: <b>${user.telegramLogin}</b>\n` +
    `${isEmailEntered(user.email)}` +
    `API_Key: <b>${user.apiKeyWildberries}</b>` +
    `${isSubscription(user.dateEndSubscription)}`;

  return textForReply;
}

function isEmailEntered(email: string): string {
  return email ? `Email: <b>${email}</b>\n` : "";
}

function isSubscription(dateEndSubscription: string) {
  return dateEndSubscription
    ? `Окончание подписки: <b>${moment(dateEndSubscription).format(
        "DD.MM.YYYY в HH:mm"
      )}</b>`
    : "";
}

export default generateTextForReplyForUserInformationController;
