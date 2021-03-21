import { generateKeybord } from "../../../features";
import { CustomContext } from "../../../types";

async function enterStep(ctx: CustomContext) {
  const { apiKeyWildberries } = ctx.session.user;
  const textForReply =
    `Ваш старый API ключ: ${apiKeyWildberries}\n` +
    "Отправьте мне новый API ключ:";
  await ctx.reply(textForReply, generateKeybord([["Отменить редактирование"]]));

  return ctx.wizard.next();
}

export default enterStep;
