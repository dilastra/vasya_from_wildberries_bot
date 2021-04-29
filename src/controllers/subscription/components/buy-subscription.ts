import { Markup } from "telegraf";
import { editUserInDB, findUserInDB } from "../../../database";
import { CustomContext } from "../../../types";
import * as moment from "moment-timezone";
import { createJobsCheckOrders, generateKeybord } from "../../../features";

async function buySubscription(ctx: CustomContext) {
  const {
    telegramId,
    dateEndSubscription,
    isProcessBuyedSubscription,
  } = ctx.session.user;
  if (!isProcessBuyedSubscription) {
    const invId = Math.floor(Math.random() * (1000 - 1000000) + 1000000);
    const linkOnPay = ctx.robokassa.getLink({
      outSum: 199.99,
      invId,
      description:
        "Оплата подписки на 1 месяц на уведовление о новых заказах в боте 'Вася с Wildberries'",
      hashMethod: "md5",
    });

    const inlineKeybord = Markup.inlineKeyboard([
      Markup.button.url("Оплатить подписку", linkOnPay),
    ]);

    const keybord = generateKeybord([
      ["Отменить оплату подписки"],
      ["Главное меню"],
    ]);

    const { message_id: messageIdPaymentMessage } = await ctx.reply(
      "Чтобы оплатить подписку на месяц, нажмите кнопку 'Заплатить'\n\n" +
        "Цена: <b>199.99 рублей </b>\n" +
        "Срок действия: <b>1 месяц с даты оплаты</b>\n\n" +
        "Оплата нужно произвести в течении 10 минут, либо ссылка на оплату самоуничтожится",
      {
        parse_mode: "HTML",
        ...inlineKeybord,
      }
    );

    const {
      message_id: messageIdNotificationsAboutDeleteMessage,
    } = await ctx.reply(
      "Оплата нужно произвести в течении 10 минут, либо ссылка на оплату самоуничтожится",
      keybord
    );

    ctx.session.user = {
      ...ctx.session.user,
      messageIdPaymentMessage,
      messageIdNotificationsAboutDeleteMessage,
    };

    ctx.taskManager.add(
      `check_payment_${telegramId}`,
      `*/${Math.floor(Math.random() * (30 - 15) + 15)} * * * * *`,
      async () => {
        const { success } = await ctx.robokassa.checkPayment(invId, "md5");
        if (success) {
          const newDateEndSubscription = dateEndSubscription
            ? moment(dateEndSubscription)
                .add(1, "month")
                .format("YYYY-MM-DDTHH:mm")
            : moment().add(1, "month").format("YYYY-MM-DDTHH:mm");

          await editUserInDB(
            { telegramId },
            { dateEndSubscription: newDateEndSubscription },
            async (err, res) => {
              if (err) return console.log(err);

              if (res) {
                ctx.session.user = await findUserInDB({ telegramId });
              }

              createJobsCheckOrders(ctx);
              ctx.telegram.editMessageText(
                telegramId,
                messageIdPaymentMessage,
                "",
                `Подписка оплачена до ${moment(newDateEndSubscription).format(
                  "DD.MM.YYYY HH:mm"
                )}`
              );

              await ctx.telegram.deleteMessage(
                telegramId,
                messageIdNotificationsAboutDeleteMessage
              );

              ctx.taskManager.deleteJob(`check_payment_${telegramId}`);
              ctx.taskManager.deleteJob(`delete_payment_${telegramId}`);
              delete ctx.session.user.messageIdNotificationsAboutDeleteMessage;
              delete ctx.session.user.messageIdPaymentMessage;
              ctx.session.user.isProcessBuyedSubscription = false;
              await ctx.reply(
                `Оплата произведена, новые заказы ${
                  dateEndSubscription ? "продолжат" : " начнут"
                } отображаться в ближайшее время.`,
                generateKeybord([["Главное меню"]])
              );
            }
          );
        }
      },
      {
        start: true,
      }
    );

    const timeDeleteMessage = moment()
      .tz("Europe/Moscow")
      .add(10, "minutes")
      .toDate();

    ctx.taskManager.add(
      `delete_payment_${telegramId}`,
      timeDeleteMessage,
      async () => {
        ctx.taskManager.deleteJob(`check_payment_${telegramId}`);
        await ctx.telegram.deleteMessage(telegramId, messageIdPaymentMessage);

        await ctx.telegram.deleteMessage(
          telegramId,
          messageIdNotificationsAboutDeleteMessage
        );

        await ctx.reply(
          "Оплата подписки отменена. " +
            "Для оплаты нужно снова нажать 'Купить подписку'",
          generateKeybord([["Купить подписку"], ["Главное меню"]])
        );

        delete ctx.session.user.messageIdNotificationsAboutDeleteMessage;
        delete ctx.session.user.messageIdPaymentMessage;
        ctx.session.user.isProcessBuyedSubscription = false;
        ctx.taskManager.deleteJob(`delete_payment_${telegramId}`);
      },
      {
        start: true,
      }
    );

    ctx.session.user.isProcessBuyedSubscription = true;
  } else {
    const textForReply =
      "Вы уже получили ссылку на оплату. Либо отмените оплату, либо дождитесь самоуничтожение ссылки";
    return ctx.reply(textForReply);
  }
}

export default buySubscription;
