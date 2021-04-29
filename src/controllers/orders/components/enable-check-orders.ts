import { createJobsCheckOrders } from "../../../features";
import { CustomContext } from "../../../types";
import { keybordForReply } from "../features";
import * as moment from "moment-timezone";

async function enableCheckOrders(ctx: CustomContext) {
  const { telegramId, dateEndSubscription } = ctx.session.user;
  if (dateEndSubscription && !moment().isAfter(dateEndSubscription)) {
    createJobsCheckOrders(ctx);
    return await ctx.reply(
      "Просмотр новых заказов включен",
      keybordForReply(ctx.taskManager, telegramId)
    );
  } else {
    return await ctx.reply(
      "Я не могу включить просмотр, т.к. вы не оплатили подписку",
      keybordForReply(ctx.taskManager, telegramId)
    );
  }
}

export default enableCheckOrders;
