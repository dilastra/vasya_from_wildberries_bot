import { generateKeybord } from "../../../features";
import { CustomContext } from "../../../types";

async function enterStep(ctx: CustomContext) {
  await ctx.reply(
    "В этой форме ты можешь отредактировать Email и API ключ от Wildberries",
    generateKeybord([
      ["Редактировать Email"],
      ["Редактировать API ключ"],
      ["Выйти"],
    ])
  );

  return ctx.wizard.next();
}

export default enterStep;
