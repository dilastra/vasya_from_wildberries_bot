import findUserInDB from "../database/find-user";
import { CustomContext } from "../types";

function customSessionMiddleware() {
  return async function (ctx: CustomContext, next: () => Promise<void>) {
    if (ctx.session && !ctx.session.user) {
      const user = await findUserInDB({ telegramId: ctx.message.from.id });
      ctx.session = user ? { user, ...ctx.session } : { ...ctx.session };
    }
    return await next();
  };
}

export default customSessionMiddleware;
