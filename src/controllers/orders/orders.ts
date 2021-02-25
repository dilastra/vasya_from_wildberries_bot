import { generateKeybord } from "../../features";
import { CustomContext } from "../../types";

async function orders(ctx: CustomContext) {
  const { telegramId } = ctx.session.user;

  const button = ctx.taskManager.exists(`checkOrders_${telegramId}`)
    ? ["Выключить просмотр новых заказов"]
    : ["Включить просмотр новых заказов"];

  await ctx.reply(
    "Это меню заказы",
    generateKeybord([button, ["Главное меню"]])
  );
}

export default orders;
