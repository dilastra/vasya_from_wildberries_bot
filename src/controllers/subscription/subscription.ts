import { generateKeybord } from "../../features";
import { CustomContext } from "../../types";

async function subscription(ctx: CustomContext) {
  return await ctx.reply(
    "Вы перешли в подписку",
    generateKeybord([["Купить подписку"], ["Главное меню"]])
  );
}

export default subscription;
