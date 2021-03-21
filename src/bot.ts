import { Scenes, session, Telegraf } from "telegraf";
import { authWizardScene, editWizardScene } from "./scenes";
import { CustomContext } from "./types";
import { controllersComposer, start } from "./controllers";
import {
  customSessionMiddleware,
  initJobCheckOrdersOnDeploy,
} from "./features";
import { createConnection, getAllUsers } from "./database";
import mainMenu from "./controllers/main-menu/main-menu";
import * as CronJobManager from "cron-job-manager";
import RobokassaPayAPI from "roboapi.ts";
import * as moment from "moment";

(async function () {
  const bot = new Telegraf<CustomContext>(process.env.ACCESS_TOKEN_BOT);

  const stage = new Scenes.Stage<CustomContext>([
    authWizardScene,
    editWizardScene,
  ]);

  const robokassaArgs = {
    mrhLogin: "vasya_from_wildberries",
    mrhPass1: "FK4PO4iDwAr9fe1Kt3iC",
    mrhPass2: "ZCR1g5YdX8tMYDrp8o4I",
  };

  bot.context.taskManager = new CronJobManager();
  bot.context.robokassa = new RobokassaPayAPI({ ...robokassaArgs });

  await createConnection();

  await initJobCheckOrdersOnDeploy(bot.context, await getAllUsers());

  bot.use(session());

  bot.use(stage.middleware());

  bot.use(customSessionMiddleware());

  bot.start(start);
  bot.use(controllersComposer);
  bot.on("text", async (ctx) => {
    return await ctx.reply("Я не понимаю того, что ты сейчас написал((((");
  });

  bot.hears("Главное меню", async (ctx) => {
    return mainMenu(ctx);
  });

  bot.launch();

  process.once("SIGINT", () => bot.stop("SIGINT"));
  process.once("SIGTERM", () => bot.stop("SIGTERM"));
})();
