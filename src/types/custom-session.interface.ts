import { Scenes } from "telegraf";
import CustomWizardSession from "./custom-wizard-session.interface";
import User from "./user.interface";

interface CustomSession extends Scenes.WizardSession<CustomWizardSession> {
  user?: User | Object;
  odidOrders: number[];
}

export default CustomSession;
