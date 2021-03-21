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
    await ctx.reply("Сейчас проверю его... 5 сек");
    if (await isValidApiKey(text)) {
      const { sceneValue } = ctx.scene.session;
      ctx.scene.session.sceneValue = { ...sceneValue, apiKeyWildberries: text };
      await ctx.reply("API ключ на удивление тоже правильный");
    } else {
      return await ctx.reply("API ключ к сожалению неправильный((\n");
    }

    const textForReply = "Будешь использовать тестовый период?";

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
