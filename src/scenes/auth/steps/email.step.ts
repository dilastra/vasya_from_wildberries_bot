import { Markup } from "telegraf";
import { CustomContext } from "../../../types";

async function emailStep(ctx: CustomContext) {
  const regularForValidateEmail = /.+@.+\..+/i;
  let isSkipped = false;
  if ("text" in ctx.message) {
    const { text } = ctx.message;
    if (text === "Пропустить ввод Email") {
      isSkipped = true;
      await ctx.reply("Правильно ввел, умница)))");
    } else if (!isSkipped) {
      if (regularForValidateEmail.test(text)) {
        await ctx.reply(
          "Окей, но пока ты не добавишь свой email, подписку не сможешь купить"
        );
        ctx.scene.session.sceneValue = { email: text };
      } else {
        return await ctx.reply("Почта не валидна");
      }
    }

    await ctx.reply(
      "Теперь мне нужен APi ключ от WB, этот шаг нельзя пропустить",
      Markup.removeKeyboard()
    );
    return ctx.wizard.next();
  }
}

export default emailStep;
