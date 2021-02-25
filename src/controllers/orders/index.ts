import { Composer } from "telegraf";
import { CustomContext } from "../../types";
import orders from "./orders";

const ordersComposer = new Composer<CustomContext>();

ordersComposer.hears("Заказы", orders);

export default ordersComposer;
