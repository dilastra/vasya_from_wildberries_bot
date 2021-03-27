import { OptionsResponse, Order } from "../../types";
import getOrders from "./api/get-orders";

async function checkAndFilterOrders(
  odids: number[],
  optionsResponse: OptionsResponse
) {
  const response = await getOrders(optionsResponse);

  if (response.ok) {
    const orders: Order[] = await response.json();
    if (orders.length > 0) {
      const filteredOrders = orders
        .filter((order) => {
          const { odid } = order;
          if (odids.includes(odid)) {
            return false;
          } else {
            odids.push(odid);
            return true;
          }
        })
        .map((order, index, orders) => {
          while (true) {
            const indexFindedOrder = orders.findIndex(
              (findingOrder, indexFindOrder) =>
                findingOrder.number === order.number && index !== indexFindOrder
            );

            if (indexFindedOrder !== -1) {
              order.quantity += 1;

              orders.splice(indexFindedOrder, 1);
              continue;
            } else {
              break;
            }
          }
          return order;
        })
        .filter((order) => {
          return order !== undefined;
        });

      return { filteredOrders, odids };
    } else {
      return { filteredOrders: [], odids };
    }
  } else {
    return { filteredOrders: [], odids };
  }
}

export default checkAndFilterOrders;
