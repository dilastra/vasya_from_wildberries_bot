import { Markup } from "telegraf";
import { CustomContext } from "../../../types";

async function enterStep(ctx: CustomContext) {
  const textForReply =
    "Для того, чтобы я смог смотреть новые заказы у тебя на Wildberries, мне нужен API ключ.\n\n";

  await ctx.reply(textForReply, Markup.removeKeyboard());

  await ctx.reply("Вот инструкция получения API ключа", {
    ...Markup.inlineKeyboard([
      Markup.button.url(
        "Где взять API ключ?",
        "https://telegra.ph/Gde-vzyat-Api-klyuch-02-25"
      ),
    ]),
  });
  return ctx.wizard.next();
}

export default enterStep;
