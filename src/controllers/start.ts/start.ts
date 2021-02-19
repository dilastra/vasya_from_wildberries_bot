import { Context } from "telegraf";
import { generateKeybord } from "../../features";
import { generatereplyOnStart } from "./features";

async function start(ctx: Context) {
  return await ctx.replyWithHTML(
    generatereplyOnStart(),
    generateKeybord([["Попробовать!"]])
  );
}

export default start;
