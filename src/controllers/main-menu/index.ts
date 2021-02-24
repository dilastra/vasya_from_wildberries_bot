import { Composer } from "telegraf";
import { CustomContext } from "../../types";
import mainMenu from "./main-menu";

const mainMenuComposer = new Composer<CustomContext>();
mainMenuComposer.hears("Главное меню", mainMenu);

export default mainMenuComposer;
