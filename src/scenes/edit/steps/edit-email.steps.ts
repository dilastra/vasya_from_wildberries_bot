import { editUserInDB, findUserInDB } from "../../../database";
import { CustomContext } from "../../../types";
import enterStep from "./enter";

async function editEmailSteps(ctx: CustomContext) {
  const regularForValidateEmail = /.+@.+\..+/i;
  if ("text" in ctx.message) {
    const { text } = ctx.message;
    if (regularForValidateEmail.test(text)) {
      const { telegramId } = ctx.session.user;
      await ctx.reply("Ура, Email валиден");
      await editUserInDB(
        { telegramId },
        { email: text },
        async function (err, res) {
          if (err) console.error(err);

          if (res) {
            await ctx.reply("Я изменил ваш email");

            ctx.session.user = await findUserInDB({ telegramId });
          }
        }
      );
      ctx.wizard.selectStep(0);
    } else {
      return await ctx.reply("Email невалиден");
    }
  }

  return await enterStep(ctx);
}

export default editEmailSteps;
