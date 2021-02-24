import { Composer } from "telegraf";
import authComposer from "./auth/auth";
import mainMenuComposer from "./main-menu";
import start from "./start/start";

const controllersComposer = Composer.compose([authComposer, mainMenuComposer]);

export { start, controllersComposer };
