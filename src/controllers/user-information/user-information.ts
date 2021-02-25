import { generateKeybord } from "../../features";
import { CustomContext } from "../../types";
import { generateTextForReplyForUserInformationController } from "./user-information-features";

async function userInformation(ctx: CustomContext) {
  const { user } = ctx.session;
  const textForReply = generateTextForReplyForUserInformationController(user);
  const keybordForReply = generateKeybord([
    ["Редактировать данные", "Главное меню"],
  ]);
  return await ctx.replyWithHTML(textForReply, keybordForReply);
}

export default userInformation;
