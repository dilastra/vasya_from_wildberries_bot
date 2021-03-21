import { generateKeybord } from "../../features";
import { CustomContext } from "../../types";
import * as moment from "moment-timezone";

async function subscription(ctx: CustomContext) {
  const { isProcessBuyedSubscription, dateEndSubscription } = ctx.session.user;

  const isCanBuySubscription = moment().isBetween(
    moment(dateEndSubscription).subtract(1, "week"),
    moment(dateEndSubscription)
  );

  const keybord = [
    dateEndSubscription
      ? [
          isCanBuySubscription
            ? isProcessBuyedSubscription
              ? "Отменить оплату подписки"
              : "Купить подписку"
            : "",
        ]
      : ["Купить подписку"],
    ["Главное меню"],
  ];

  const keybordForReply = generateKeybord(keybord);

  const textForReply = dateEndSubscription
    ? `Окончание подписки: <b>${moment(dateEndSubscription).format(
        "DD.MM.YYYY в HH:mm"
      )}</b>\n\n` +
      `Подписку можно будет продлить с <b>${moment(dateEndSubscription)
        .subtract(1, "week")
        .format("DD.MM.YYYY")}</b>`
    : "У вас нету ещё подписки";
  return await ctx.reply(textForReply, {
    ...keybordForReply,
    parse_mode: "HTML",
  });
}

export default subscription;
