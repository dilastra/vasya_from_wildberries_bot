import { Composer } from "telegraf";
import { CustomContext } from "../../types";
import supportService from "./support-service";

const supportServiceComposer = new Composer<CustomContext>();

supportServiceComposer.hears("Служба поддержки бота", supportService);

export default supportServiceComposer;
