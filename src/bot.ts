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

(async function () {
  const bot = new Telegraf<CustomContext>(process.env.ACCESS_TOKEN_BOT);

  const stage = new Scenes.Stage<CustomContext>([
    authWizardScene,
    editWizardScene,
  ]);

  bot.context.taskManager = new CronJobManager();

  const robokassaArgs = {
    mrhLogin: process.env.ROBOKASSA_MRHLOGIN,
    mrhPass1: process.env.ROBOKASSA_MRHPASS1,
    mrhPass2: process.env.ROBOKASSA_MRHPASS2,
  };

  bot.context.robokassa = new RobokassaPayAPI({ ...robokassaArgs });

  bot.use(session());

  bot.use(stage.middleware());

  bot.use(customSessionMiddleware());

  await createConnection();

  await initJobCheckOrdersOnDeploy(bot.context, await getAllUsers());

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
