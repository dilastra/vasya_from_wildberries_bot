import { Markup } from "telegraf";
import { CustomContext } from "../../../types";

async function emailStep(ctx: CustomContext) {
  const regularForValidateEmail = /.+@.+\..+/i;
  let isSkipped = false;
  if ("text" in ctx?.message) {
    const { text } = ctx.message;
    if (text === "Пропустить ввод Email") {
      isSkipped = true;
      await ctx.reply(
        "Окей, но пока ты не добавишь свой email, подписку не сможешь купить",
        Markup.removeKeyboard()
      );
    } else if (!isSkipped) {
      if (regularForValidateEmail.test(text)) {
        await ctx.reply("Правильно ввел, умница)))", Markup.removeKeyboard());
        ctx.scene.session.sceneValue = { email: text };
      } else {
        return await ctx.reply("Почта не валидна");
      }
    }

    await ctx.reply(
      "Теперь мне нужен APi ключ от WB, этот шаг нельзя пропустить",
      Markup.inlineKeyboard([
        Markup.button.url(
          "Где взять API ключ?",
          "https://telegra.ph/Gde-vzyat-Api-klyuch-02-25"
        ),
      ])
    );
    return ctx.wizard.next();
  } else {
    return await ctx.reply(
      "Это все хорошо, но вернемся лучше к делу, отправь мне Email, либо пропусти)))"
    );
  }
}

export default emailStep;
