import { editUserInDB, findUserInDB } from "../../../database";
import { request } from "../../../features";
import { CustomContext } from "../../../types";
import * as moment from "moment-timezone";
import enterStep from "./enter";

async function isValidApiKey(apiKey: string) {
  const dateNow = moment().tz("Europe/Moscow").format("YYYY-MM-DD");
  const url = `https://suppliers-stats.wildberries.ru/api/v1/supplier/incomes?dateFrom=${dateNow}&key=${apiKey}`;
  const response = await request(encodeURI(url));
  const isKeyOtherUser = await findUserInDB({ apiKeyWildberries: apiKey });
  if (response.ok && !isKeyOtherUser) {
    return true;
  } else {
    return false;
  }
}

async function editApiKeySteps(ctx: CustomContext) {
  if ("text" in ctx.message) {
    const { text } = ctx.message;
    if (await isValidApiKey(text)) {
      const { telegramId } = ctx.session.user;
      await ctx.reply("Ура, API ключ валиден");
      await editUserInDB(
        { telegramId },
        { apiKeyWildberries: text },
        async function (err, res) {
          if (err) console.error(err);

          if (res) {
            await ctx.reply("Я изменил ваш API ключ");

            ctx.session.user = await findUserInDB({ telegramId });
          }
        }
      );

      ctx.wizard.selectStep(0);
    } else {
      return await ctx.reply("API ключ невалиден");
    }
  }
  return await enterStep(ctx);
}

export default editApiKeySteps;
