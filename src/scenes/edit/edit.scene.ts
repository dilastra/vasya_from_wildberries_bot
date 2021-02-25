import { Scenes } from "telegraf";
import userInformation from "../../controllers/user-information/user-information";
import { CustomContext } from "../../types";
import {
  choiceEditableSteps,
  editApiKeySteps,
  editEmailSteps,
  enterStep,
} from "./steps";

const editWizardScene = new Scenes.WizardScene<CustomContext>(
  "editScene",
  enterStep, // cursor = 0
  choiceEditableSteps, // cursor = 1
  editEmailSteps, // cursor = 2
  editApiKeySteps // cursor = 3
);

editWizardScene.hears("Выйти", async (ctx) => {
  ctx.scene.leave();

  return userInformation(ctx);
});

editWizardScene.hears("Отменить редактирование", async (ctx) => {
  ctx.wizard.selectStep(0);

  return await enterStep(ctx);
});

export default editWizardScene;
