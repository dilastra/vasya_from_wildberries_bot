import { Composer } from "telegraf";
import { CustomContext } from "../../types";
import { buySubscription, cancelBuySubscription } from "./components";
import subscription from "./subscription";

const subscriptionComposer = new Composer<CustomContext>();

subscriptionComposer.hears("Подписка", subscription);

subscriptionComposer.hears("Купить подписку", buySubscription);

subscriptionComposer.hears("Отменить оплату подписки", cancelBuySubscription);

export default subscriptionComposer;
