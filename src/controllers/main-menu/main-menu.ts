import { Composer } from "telegraf";
import { generateKeybord } from "../../features";
import { CustomContext } from "../../types";

async function mainMenu(
  ctx: CustomContext,
  textForReply = "Ты перешел в главное меню"
) {
  return await ctx.reply(
    textForReply,
    generateKeybord([["Заказы", "Подписка"], ["API ключ от Wildberries"]])
  );
}

export default mainMenu;
