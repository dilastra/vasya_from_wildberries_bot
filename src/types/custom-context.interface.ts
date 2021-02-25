import { Context, Scenes } from "telegraf";
import CustomSession from "./custom-session.interface";
import CustomWizardSession from "./custom-wizard-session.interface";

interface CustomContext extends Context {
  taskManager: any;
  storeOdids: Map<string, number[]>;
  session: CustomSession;
  scene: Scenes.SceneContextScene<CustomContext, CustomWizardSession>;
  wizard: Scenes.WizardContextWizard<CustomContext>;
}

export default CustomContext;
