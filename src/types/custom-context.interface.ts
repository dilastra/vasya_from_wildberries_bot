import RobokassaPayAPI from "roboapi.ts";
import { Context, Scenes } from "telegraf";
import CustomSession from "./custom-session.interface";
import CustomWizardSession from "./custom-wizard-session.interface";

interface CustomContext extends Context {
  taskManager: any;
  robokassa: RobokassaPayAPI;
  session: CustomSession;
  scene: Scenes.SceneContextScene<CustomContext, CustomWizardSession>;
  wizard: Scenes.WizardContextWizard<CustomContext>;
}

export default CustomContext;
