import { Composer } from "telegraf";
import apiKeyComposer from "./api-key";
import authComposer from "./auth/auth";
import communityComposer from "./community";
import mainMenuComposer from "./main-menu";
import ordersComposer from "./orders";
import start from "./start/start";
import subscriptionComposer from "./subscription";
import supportServiceComposer from "./support-service";

const controllersComposer = Composer.compose([
  apiKeyComposer,
  authComposer,
  communityComposer,
  mainMenuComposer,
  ordersComposer,
  subscriptionComposer,
  supportServiceComposer,
]);

export { start, controllersComposer };
