import { Order } from "../../types";
import createDescriptionOrder from "./features/create-description-order";

async function createOrderForReply(order: Order) {
  const { nmId: codeWildberries } = order;
  const descriptionOrder = await createDescriptionOrder(order);

  const urlImageOrders = `https://images.wbstatic.net/c516x688/new/${`${codeWildberries}`.slice(
    0,
    4
  )}0000/${codeWildberries}-1.jpg`;
  return { descriptionOrder, urlImageOrders };
}

export default createOrderForReply;
