import { Scenes } from "telegraf";
import User from "./user.interface";

interface CustomWizardSession extends Scenes.WizardSessionData {
  sceneValue: {
    email?: string;
    apiKeyWildberries?: string;
    isUsedTestPeriod?: boolean;
    dateEndSubscription?: string;
  };
}

export default CustomWizardSession;
