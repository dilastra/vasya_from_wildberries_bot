import { CustomContext } from "../../../types";
import { keybordForReply } from "../features";

async function disableCheckOrders(ctx: CustomContext) {
  const { telegramId } = ctx.session.user;
  ctx.taskManager.deleteJob(`checkOrders_${ctx.session.user.telegramId}`);
  return await ctx.reply(
    "Я теперь не буду присылать тебе новые заказы",
    keybordForReply(ctx.taskManager, telegramId)
  );
}

export default disableCheckOrders;
