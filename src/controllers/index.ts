import { Composer } from "telegraf";
import authComposer from "./auth/auth";
import mainMenuComposer from "./main-menu";
import ordersComposer from "./orders";
import start from "./start/start";
import userInforamtionComposer from "./user-information";

const controllersComposer = Composer.compose([
  authComposer,
  mainMenuComposer,
  ordersComposer,
  userInforamtionComposer,
]);

export { start, controllersComposer };
