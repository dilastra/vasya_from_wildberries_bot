import { Scenes } from "telegraf";
import apiKey from "../../controllers/api-key/api-key";
import { CustomContext } from "../../types";
import { editApiKeySteps, enterStep } from "./steps";

const editWizardScene = new Scenes.WizardScene<CustomContext>(
  "editScene",
  enterStep, // cursor = 0
  editApiKeySteps // cursor = 3
);

editWizardScene.hears("Выйти", async (ctx) => {
  ctx.scene.leave();
  return await apiKey(ctx);
});

editWizardScene.hears("Отменить редактирование", async (ctx) => {
  ctx.scene.leave();

  return await apiKey(ctx);
});

export default editWizardScene;
