import * as moment from "moment-timezone";
import { Telegram } from "telegraf";
import { editUserInDB, findUserInDB } from "../database";
import { CustomContext } from "../types";
import checkAndFilterOrders from "./check-orders";
import createOrderForReply from "./create-orders-for-reply";
import isNightNow from "./is-night-now";

function createJobsCheckOrders(
  ctx: CustomContext | Partial<CustomContext>,
  user = ctx.session.user
) {
  const telegram = ctx.telegram ?? new Telegram(process.env.ACCESS_TOKEN_BOT);
  ctx.taskManager.add(
    `checkOrders_${user.telegramId}`,
    `0 */${Math.floor(Math.random() * (35 - 27) + 27)} * * * * `,
    async function () {
      const { apiKeyWildberries, telegramId, dateEndSubscription } = user;
      if (!moment().isAfter(dateEndSubscription)) {
        const optionsResponse = {
          dateComingOrders: moment().tz("America/Nuuk").format("YYYY-MM-DD"),
          apiKeyWildberries: apiKeyWildberries,
        };

        const odids = ctx.storeOdids.get(`${user.telegramId}`) ?? [];

        const {
          filteredOrders: orders,
          odids: newOdids,
        } = await checkAndFilterOrders(odids, optionsResponse);

        ctx.storeOdids.set(`${telegramId}`, newOdids);

        if (orders.length > 0) {
          const ordersForReply = orders.map(createOrderForReply);

          for (let orderForReply of ordersForReply) {
            const { descriptionOrder, urlImageOrders } = await orderForReply;
            try {
              await telegram.sendPhoto(telegramId, urlImageOrders, {
                caption: descriptionOrder,
                parse_mode: "HTML",
                disable_notification: isNightNow(),
              });
            } catch ({ response: { error_code } }) {
              ctx.taskManager.stop(`checkOrders_${telegramId}`);
              ctx.taskManager.deleteJob(`checkOrders_${telegramId}`);
              break;
            }
          }
          return;
        }
      } else {
        ctx.taskManager.deleteJob(`checkOrders_${telegramId}`);
        await editUserInDB(
          { telegramId },
          { dateEndSubscription: "" },
          async function (err, res) {
            if (err) return console.log(err);

            if (res) {
              await findUserInDB({ telegramId });
            }
          }
        );
        await telegram.sendMessage(
          telegramId,
          "Подписка окончена, пожайлуста, оплатите её для дальнейшей работы"
        );
      }
    },
    {
      timeZone: "America/Nuuk",
      start: true,
    }
  );

  if (!ctx.taskManager.exists(`clearOdids_${user.telegramId}`)) {
    ctx.taskManager.add(
      `clearOdids_${user.telegramId}`,
      "0 0 0 * * *",
      () => {
        ctx.storeOdids.delete(`${user.telegramId}`);
        if (!ctx.taskManager.exists(`checkOrders_${user.telegramId}`)) {
          ctx.taskManager.deleteJob(`clearSessionOdids_${user.telegramId}`);
        }
      },
      {
        timeZone: "America/Nuuk",
        start: true,
      }
    );
  }
}

export default createJobsCheckOrders;
