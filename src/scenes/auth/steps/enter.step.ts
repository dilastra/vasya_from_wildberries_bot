import { Markup } from "telegraf";
import { CustomContext } from "../../../types";

async function enterStep(ctx: CustomContext) {
  const textForReply =
    "Для начала работы, как я и говорил, мне нужен API ключ от Wildberries Партнеры. " +
    "Инструкцию получения API ключа я прекрипил к этому сообщению\n\n";

  await ctx.reply(textForReply, {
    ...Markup.inlineKeyboard([
      Markup.button.url(
        "Где взять API ключ?",
        "https://telegra.ph/Gde-vzyat-Api-klyuch-02-25"
      ),
    ]),
  });

  await ctx.reply(
    "Как его получишь, отправь мне его сообщением",
    Markup.removeKeyboard()
  );

  return ctx.wizard.next();
}

export default enterStep;
