import { Composer } from "telegraf";
import { CustomContext } from "../../types";
import community from "./community";

const communityComposer = new Composer<CustomContext>();

communityComposer.hears("Сообщества", community);

export default communityComposer;
