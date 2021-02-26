import { CustomContext } from "../../types";
import { keybordForReply } from "./features";

async function orders(ctx: CustomContext) {
  const { telegramId } = ctx.session.user;
  await ctx.reply(
    "Это меню заказы",
    keybordForReply(ctx.taskManager, telegramId)
  );
}

export default orders;
