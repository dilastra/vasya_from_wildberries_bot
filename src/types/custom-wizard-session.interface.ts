import { Scenes } from "telegraf";
import User from "./user.interface";

interface CustomWizardSession extends Scenes.WizardSessionData {
  sceneValue: {
    apiKeyWildberries?: string;
    isUsedTestPeriod?: boolean;
    dateEndSubscription?: string;
  };
}

export default CustomWizardSession;
