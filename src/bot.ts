import { Telegraf } from "telegraf";
import { start } from "./controllers";

const bot = new Telegraf(process.env.ACCESS_TOKEN_BOT);

bot.start(start);

bot.launch();
