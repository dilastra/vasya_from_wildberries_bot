import { CustomContext } from "../../../types";
import * as moment from "moment-timezone";
import addUser from "../../../database/add-user";
import mainMenu from "../../../controllers/main-menu/main-menu";

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
    } else {
      sceneValue = {
        ...sceneValue,
        isUsedTestPeriod: false,
        dateEndSubscription: "",
      };
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
        await ctx.reply("Спасибо за авторизацию");
        ctx.scene.leave();

        return await mainMenu(ctx);
      }
    });
  } else {
    return await ctx.reply(
      "Это все хорошо, но вернемся лучше к делу, отправь мне Email, либо пропусти)))"
    );
  }
}

export default lastSteps;
