import { Composer } from "telegraf";
import { CustomContext } from "../../types";
import { disableCheckOrders, enableCheckOrders } from "./components";
import orders from "./orders";

const ordersComposer = new Composer<CustomContext>();

ordersComposer.hears("Заказы", orders);

ordersComposer.hears("Выключить просмотр новых заказов", disableCheckOrders);

ordersComposer.hears("Включить просмотр новых заказов", enableCheckOrders);

export default ordersComposer;
