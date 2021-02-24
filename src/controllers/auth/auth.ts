import { Composer } from "telegraf";
import { CustomContext } from "../../types";

const authComposer = new Composer<CustomContext>();

authComposer.hears("Попробовать!", async (ctx: CustomContext) => {
  if (!ctx.session.user) {
    return await ctx.scene.enter("authScene");
  }

  return await ctx.reply("Зачем тебе это снова делать???");
});

export default authComposer;
