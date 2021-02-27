import { Composer } from "telegraf";
import { CustomContext } from "../../types";
import { buySubscription } from "./components";
import * as moment from "moment-timezone";
import subscription from "./subscription";
import { editUserInDB, findUserInDB } from "../../database";
import { createJobsCheckOrders } from "../../features";

const subscriptionComposer = new Composer<CustomContext>();

subscriptionComposer.hears("Подписка", subscription);

subscriptionComposer.hears("Купить подписку", buySubscription);

subscriptionComposer.on("pre_checkout_query", async (ctx: CustomContext) => {
  return await ctx.answerPreCheckoutQuery(true);
});

subscriptionComposer.on("successful_payment", async (ctx: CustomContext) => {
  const { dateEndSubscription, telegramId } = ctx.session.user;
  const newDateEndSubscription = dateEndSubscription
    ? moment(dateEndSubscription).add(1, "month").format("YYYY-MM-DDTHH:mm")
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

      await ctx.reply(
        "Спасибо за оплату подписки, просмотр новых заказов начат"
      );
    }
  );
});

export default subscriptionComposer;
