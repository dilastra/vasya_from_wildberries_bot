import { generateKeybord } from "../../features";
import { CustomContext } from "../../types";

async function apiKey(ctx: CustomContext) {
  const { user } = ctx.session;
  const textForReply = `API ключ от Wildberries: <b>${user.apiKeyWildberries}</b>\n`;
  const keybordForReply = generateKeybord([
    ["Редактировать API ключ"],
    ["Главное меню"],
  ]);
  return await ctx.replyWithHTML(textForReply, keybordForReply);
}

export default apiKey;
