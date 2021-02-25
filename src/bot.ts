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

(async function () {
  const bot = new Telegraf<CustomContext>(process.env.ACCESS_TOKEN_BOT);

  const stage = new Scenes.Stage<CustomContext>([
    authWizardScene,
    editWizardScene,
  ]);

  bot.context.taskManager = new CronJobManager();
  bot.context.storeOdids = new Map();

  await createConnection();

  await initJobCheckOrdersOnDeploy(
    bot.telegram,
    bot.context,
    await getAllUsers()
  );

  bot.use(session());

  bot.use(stage.middleware());

  bot.use(customSessionMiddleware());

  // controllers
  bot.start(start);
  bot.use(controllersComposer);
  bot.on("text", async (ctx) => {
    return await ctx.reply("Я не понимаю того, что ты сейчас написал((((");
  });

  bot.hears("Главное меню", async (ctx) => {
    console.log(bot.context);
    return mainMenu(ctx);
  });

  bot.launch();

  process.once("SIGINT", () => bot.stop("SIGINT"));
  process.once("SIGTERM", () => bot.stop("SIGTERM"));
})();
