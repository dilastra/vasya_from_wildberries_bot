import { generateKeybord } from "../../../features";
import { CustomContext } from "../../../types";

async function enterStep(ctx: CustomContext) {
  const textForReply =
    "Теперь мы должны познакомиться))\n\n" +
    "Отправь мне свой Email)))\n" +
    "Мне он нужен для того, чтобы тебе отправлять чеки об оплате подписки.\n" +
    "Если ты пока не собираешься покупать подписку, то можешь пропустить этот шаг.";
  await ctx.reply(textForReply, generateKeybord([["Пропустить ввод Email"]]));
  return ctx.wizard.next();
}

export default enterStep;
