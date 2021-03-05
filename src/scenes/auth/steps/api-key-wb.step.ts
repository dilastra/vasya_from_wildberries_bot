import * as moment from "moment-timezone";
import { findUserInDB } from "../../../database";
import { generateKeybord, request } from "../../../features";
import { CustomContext } from "../../../types";

async function isValidApiKey(apiKey: string) {
  const dateNow = moment().tz("Europe/Moscow").format("YYYY-MM-DD");
  const url = `https://suppliers-stats.wildberries.ru/api/v1/supplier/incomes?dateFrom=${dateNow}&key=${apiKey}`;
  const response = await request(url);
  if (response.ok) {
    return true;
  } else {
    return false;
  }
}

async function apiKeyWbStep(ctx: CustomContext) {
  if (ctx.message && "text" in ctx.message) {
    const { text } = ctx.message;
    await ctx.reply("Сейчас проверю его");
    if (await isValidApiKey(text)) {
      const { sceneValue } = ctx.scene.session;
      ctx.scene.session.sceneValue = { ...sceneValue, apiKeyWildberries: text };
      await ctx.reply("Api ключ валидный, круто)");
    } else {
      return await ctx.reply(
        "Ключ к сожалению неправильный или его уже кто-то использует, проверьте, или попробуйте другой"
      );
    }

    const textForReply =
      "Я сейчас могу тебе предложить использовать тестовый период\n" +
      "Но также ты можешь отказаться, и потом перейти в раздел подписки, и купить подписку";

    const keybordsForReply = [["Использовать тестовый период"], ["Отказаться"]];

    await ctx.reply(textForReply, generateKeybord(keybordsForReply));

    return ctx.wizard.next();
  } else {
    return await ctx.reply(
      "Это все хорошо, но вернемся лучше к делу, отправь мне Email, либо пропусти)))"
    );
  }
}

export default apiKeyWbStep;
