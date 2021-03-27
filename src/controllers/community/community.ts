import { Markup } from "telegraf";
import { CustomContext } from "../../types";

function community(ctx: CustomContext) {
  const textForReply = "Сообщества бота";
  const keybord = Markup.inlineKeyboard([
    Markup.button.url("Канал", "https://t.me/misha_from_wildberries_channel"),
    Markup.button.url("Чат", "https://t.me/misha_from_wildberries_chat"),
  ]);
  return ctx.reply(textForReply, keybord);
}

export default community;
