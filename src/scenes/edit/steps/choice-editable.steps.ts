import { generateKeybord } from "../../../features";
import { CustomContext } from "../../../types";

async function choiceEditableSteps(ctx: CustomContext) {
  const EDIT_EMAIL = "Редактировать Email";
  const EDIT_API_KEY = "Редактировать API ключ";
  let textForReply: string;

  if ("text" in ctx.message) {
    const { text } = ctx.message;

    if (text === EDIT_EMAIL) {
      const { email } = ctx.session.user;
      textForReply =
        (email
          ? `Ваш старый Email: ${email}\n`
          : `Вы не вводили email при авторизации\n`) +
        "Отправьте мне новый email:";
      ctx.wizard.next();
    } else if (text === EDIT_API_KEY) {
      const { apiKeyWildberries } = ctx.session.user;

      textForReply =
        `Ваш старый API ключ: ${apiKeyWildberries}\n` +
        "Отправьте мне новый API ключ:";
      ctx.wizard.selectStep(3);
    }
  }

  await ctx.reply(textForReply, generateKeybord([["Отменить редактирование"]]));
}

export default choiceEditableSteps;
