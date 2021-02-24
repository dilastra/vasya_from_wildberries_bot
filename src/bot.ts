import { Scenes, session, Telegraf } from "telegraf";
import { authWizardScene } from "./scenes";
import { CustomContext } from "./types";
import { controllersComposer, start } from "./controllers";
import { customSessionMiddleware } from "./features";
import { createConnection } from "./database";
(async function () {
  const bot = new Telegraf<CustomContext>(process.env.ACCESS_TOKEN_BOT);

  const stage = new Scenes.Stage<CustomContext>([authWizardScene]);

  await createConnection();

  bot.use(session());

  bot.use(stage.middleware());

  bot.use(customSessionMiddleware());

  // controllers
  bot.start(start);
  bot.use(controllersComposer);

  bot.launch();

  process.once("SIGINT", () => bot.stop("SIGINT"));
  process.once("SIGTERM", () => bot.stop("SIGTERM"));
})();
