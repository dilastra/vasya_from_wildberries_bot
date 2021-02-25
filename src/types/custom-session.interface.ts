import { Scenes } from "telegraf";
import CustomWizardSession from "./custom-wizard-session.interface";
import User from "./user.interface";

interface CustomSession extends Scenes.WizardSession<CustomWizardSession> {
  user?: User | undefined;
}

export default CustomSession;
