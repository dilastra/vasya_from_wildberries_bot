import { generateKeybord } from "../../../features";

function keybordForReply(taskManager: any, telegramId: number) {
  const button = taskManager.exists(`checkOrders_${telegramId}`)
    ? ["Выключить просмотр новых заказов"]
    : ["Включить просмотр новых заказов"];

  return generateKeybord([button, ["Главное меню"]]);
}

export default keybordForReply;
