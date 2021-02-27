import { Markup } from "telegraf";
import { Invoice } from "telegraf/typings/telegram-types";

function createInvoice(telegramId: number) {
  const InlineKeyboardForInvoice = Markup.inlineKeyboard([
    Markup.button.pay("Заплатить 499 RUB"),
  ]);
  const invoice = {
    chat_id: telegramId,
    title: "Подписку на проверку заказов",
    description: "Покупка подписки на 1 месяц",
    payload: process.env.PAYMENT_TOKEN,
    provider_token: process.env.PAYMENT_TOKEN,
    start_parameter: "test",
    currency: "RUB",
    prices: [
      {
        label: "RUB",
        amount: 49900,
      },
    ],
    reply_markup: InlineKeyboardForInvoice,
  };

  return invoice;
}

export default createInvoice;
