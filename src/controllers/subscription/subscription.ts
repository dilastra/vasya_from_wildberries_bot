import { generateKeybord } from "../../features";
import { CustomContext } from "../../types";
import * as moment from "moment-timezone";

async function subscription(ctx: CustomContext) {
  const { isProcessBuyedSubscription, dateEndSubscription } = ctx.session.user;

  const isCanBuySubscription = dateEndSubscription
    ? moment().isAfter(moment(dateEndSubscription).subtract(1, "week"))
    : true;

  const keybord = [
    [
      isCanBuySubscription
        ? isProcessBuyedSubscription
          ? "Отменить оплату подписки"
          : "Купить подписку"
        : "",
    ],
    ["Главное меню"],
  ];

  const keybordForReply = generateKeybord(keybord);

  const textForReply = dateEndSubscription
    ? `Окончание подписки: <b>${moment(dateEndSubscription).format(
        "DD.MM.YYYY в HH:mm"
      )}</b>\n\n` +
      `Подписку можно продлить с <b>${moment(dateEndSubscription)
        .subtract(1, "week")
        .format("DD.MM.YYYY")}</b>`
    : isProcessBuyedSubscription
    ? "Ссылка оплата сгенерирована. Оплатите или отмените оплату, или дождитесь самоуничтожения ссылки на оплату"
    : "У вас нету подписки";
  return await ctx.reply(textForReply, {
    ...keybordForReply,
    parse_mode: "HTML",
  });
}

export default subscription;
