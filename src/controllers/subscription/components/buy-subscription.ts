import { CustomContext } from "../../../types";
import { createInvoice } from "../features";

async function buySubscription(ctx: CustomContext) {
  const { telegramId, dateEndSubscription } = ctx.session.user;
  if (!dateEndSubscription) {
    return await ctx.replyWithInvoice(createInvoice(telegramId));
  } else {
    return await ctx.reply("Вы уже имеете подписку.");
  }
}

export default buySubscription;
