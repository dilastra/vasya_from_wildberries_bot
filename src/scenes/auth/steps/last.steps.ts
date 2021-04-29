import { CustomContext } from "../../../types";
import * as moment from "moment-timezone";
import addUser from "../../../database/add-user";
import mainMenu from "../../../controllers/main-menu/main-menu";
import { createJobsCheckOrders } from "../../../features";

async function lastSteps(ctx: CustomContext) {
  if ("text" in ctx.message) {
    const { text } = ctx.message;
    let { sceneValue } = ctx.scene.session;
    if (text === "Использовать тестовый период") {
      const dateEndSubscription = moment()
        .tz("Europe/Moscow")
        .add(7, "days")
        .format("YYYY-MM-DDTHH:mm");
      sceneValue = {
        ...sceneValue,
        isUsedTestPeriod: true,
        dateEndSubscription: dateEndSubscription,
      };
    } else if (text === "Отказаться") {
      sceneValue = {
        ...sceneValue,
        isUsedTestPeriod: false,
        dateEndSubscription: "",
      };
    } else {
      return await ctx.reply(
        "Немного не понял) Нажмите одну из двух кнопок в клавиатуре))"
      );
    }

    ctx.scene.session.sceneValue = null;

    const {
      id: telegramId,
      first_name: firstName,
      last_name: lastName,
      username: telegramLogin,
    } = ctx.message.from;

    const newUser = {
      telegramId,
      firstName,
      lastName,
      telegramLogin,
      ...sceneValue,
    };

    await addUser(newUser, async function (err, user) {
      if (err) return console.error(err);

      if (user) {
        ctx.session.user = { ...user.toObject() };
        if (user.dateEndSubscription) createJobsCheckOrders(ctx);
        await ctx.reply("Спасибо за авторизацию");
        await ctx.reply(
          "Просмотр новых заказов уже начат) Если новые заказы появятся, я пришлю тебе информацию о них)"
        );
        ctx.scene.leave();

        return await mainMenu(ctx);
      }
    });
  }
}

export default lastSteps;
