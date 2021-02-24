import { Scenes } from "telegraf";
import { start } from "../../controllers";
import { CustomContext } from "../../types";
import { apiKeyWbStep, emailStep, enterStep, lastSteps } from "./steps";

const authWizardScene = new Scenes.WizardScene<CustomContext>(
  "authScene",
  enterStep,
  emailStep,
  apiKeyWbStep,
  lastSteps
);

authWizardScene.start(async (ctx) => {
  await ctx.scene.leave();

  return start(ctx);
});

export default authWizardScene;
