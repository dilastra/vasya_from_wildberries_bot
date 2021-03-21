import { generateKeybord } from "../../../features";
import { CustomContext } from "../../../types";

async function cancelBuySubscription(ctx: CustomContext) {
  if (ctx.session.user.isProcessBuyedSubscription) {
    const {
      messageIdNotificationsAboutDeleteMessage,
      messageIdPaymentMessage,
      telegramId,
    } = ctx.session.user;

    await ctx.telegram.deleteMessage(telegramId, messageIdPaymentMessage);

    await ctx.telegram.deleteMessage(
      telegramId,
      messageIdNotificationsAboutDeleteMessage
    );

    ctx.session.user.isProcessBuyedSubscription = false;
    ctx.taskManager.deleteJob(`check_payment_${telegramId}`);
    if (ctx.taskManager.exists(`delete_payment_${telegramId}`)) {
      ctx.taskManager.deleteJob(`delete_payment_${telegramId}`);
    }

    return await ctx.reply(
      "Вы отменили оплату подписки",
      generateKeybord([["Купить подписку"], ["Главное меню"]])
    );
  } else {
    return ctx.reply("Оплата подписки отменена");
  }
}

export default cancelBuySubscription;
