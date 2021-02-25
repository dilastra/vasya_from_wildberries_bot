import { Telegram } from "telegraf";
import { User } from "../types";
import * as moment from "moment-timezone";
import checkAndFilterOrders from "./check-orders";
import createOrderForReply from "./create-orders-for-reply";
import isNightNow from "./is-night-now";

async function initJobCheckOrdersOnDeploy(
  telegram: Telegram,
  context: any,
  users: User[]
) {
  users
    .filter((user) => {
      return !!user.dateEndSubscription;
    })
    .map((user) => {
      context.taskManager.add(
        `checkOrders_${user.telegramId}`,
        `0 */${Math.floor(Math.random() * (35 - 27) + 27)} * * * * `,
        async function () {
          const { apiKeyWildberries, telegramId } = user;
          const optionsResponse = {
            dateComingOrders: moment().tz("Europe/Dublin").format("YYYY-MM-DD"),
            apiKeyWildberries: apiKeyWildberries,
          };

          const odids = context.storeOdids.has(`${user.telegramId}`)
            ? context.storeOdids.get(`${user.telegramId}`)
            : [];

          const {
            filteredOrders: orders,
            odids: newOdids,
          } = await checkAndFilterOrders(odids, optionsResponse);
          context.storeOdids.set(`${telegramId}`, newOdids);
          orders.map(createOrderForReply).map(async (orderForReply) => {
            const { descriptionOrder, urlImageOrders } = await orderForReply;
            telegram.sendPhoto(telegramId, urlImageOrders, {
              caption: descriptionOrder,
              parse_mode: "HTML",
              disable_notification: isNightNow(),
            });
          });
        },
        {
          timeZone: "Europe/Dublin",
          start: true,
        }
      );
      context.taskManager.add(
        `clearOdids_${user.telegramId}`,
        "0 0 0 * * *",
        () => {
          context.storeOdids.delete(`${user.telegramId}`);
          if (!context.taskManager.exists(`checkOrders_${user.telegramId}`)) {
            context.taskManager.deleteJob(
              `clearSessionOdids_${user.telegramId}`
            );
          }
        },
        {
          timeZone: "Europe/Dublin",
          start: true,
        }
      );
    });
}

export default initJobCheckOrdersOnDeploy;
