import { User } from "../../../types";

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
    `API_Key: <b>${user.apiKeyWildberries}</b>`;

  return textForReply;
}

function isEmailEntered(email: string): string {
  return email ? `Email: <b>${email}</b>\n` : "";
}

export default generateTextForReplyForUserInformationController;
