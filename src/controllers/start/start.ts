import { generateKeybord } from "../../features";
import { CustomContext } from "../../types";
import mainMenu from "../main-menu/main-menu";
import { generatereplyOnStart } from "./start-controller-features";

async function start(ctx: CustomContext) {
  if (ctx.session.user) {
    const textForReply = "Привет))\n" + "Спасибо, что ты вернулся)))";

    return await mainMenu(ctx, textForReply);
  }
  return await ctx.replyWithHTML(
    generatereplyOnStart(),
    generateKeybord([["Попробовать!"]]).oneTime()
  );
}

export default start;
