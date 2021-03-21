import { Composer } from "telegraf";
import { CustomContext } from "../../types";
import apiKey from "./api-key";

const apiKeyComposer = new Composer<CustomContext>();

apiKeyComposer.hears("API ключ от Wildberries", apiKey);

apiKeyComposer.hears("Редактировать API ключ", (ctx) => {
  ctx.scene.enter("editScene");
});

export { apiKeyComposer };
