import { CustomContext } from "../../../types";
import { createInvoice } from "../features";

async function buySubscription(ctx: CustomContext) {
  const { telegramId } = ctx.session.user;
  return await ctx.replyWithInvoice(createInvoice(telegramId));
}

export default buySubscription;
