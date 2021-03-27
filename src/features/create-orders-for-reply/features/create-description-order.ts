import { Order } from "../../../types";
import * as moment from "moment-timezone";
import getProductName from "./get-product-name";

async function createDescriptionOrder(order: Order): Promise<string> {
  const {
    number,
    brand,
    supplierArticle,
    quantity,
    discountPercent,
    oblast,
    nmId,
    date,
    totalPrice,
  } = order;

  const descriptionOrder =
    `Дата и время заказа: <b>${moment(date).format("DD.MM.YYYY HH:mm")}</b>\n` +
    `Номер заказа: <b>${number}</b>\n` +
    `Арктикул товара: <b>${supplierArticle}</b>\n` +
    `Бренд товара: <b>${brand}</b>\n` +
    `Название товара: <b>${await getProductName(nmId)}</b>\n` +
    `Количество товара: <b>${quantity}</b>\n` +
    `Сумма продажи с учетом скидок: <b>${(
      ((totalPrice * (100 - discountPercent)) / 100) *
      quantity
    ).toFixed(2)}₽</b>\n` +
    `Регион заказа: <b>${oblast}</b>`;

  return descriptionOrder;
}

export default createDescriptionOrder;
