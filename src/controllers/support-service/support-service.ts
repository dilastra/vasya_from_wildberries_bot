import { Markup } from "telegraf";
import { CustomContext } from "../../types";

function supportService(ctx: CustomContext) {
  return ctx.reply("Нужна помощь?\nСвяжитесь с поддержкой!", {
    ...Markup.inlineKeyboard([
      Markup.button.url(
        "Служба поддержки бота",
        "https://t.me/misha_from_wildberries_support"
      ),
    ]),
  });
}

export default supportService;
