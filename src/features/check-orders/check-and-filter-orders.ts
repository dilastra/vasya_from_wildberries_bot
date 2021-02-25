import { OptionsResponse, Order } from "../../types";
import getOrders from "./api/get-orders";

async function checkAndFilterOrders(
  odids: number[],
  optionsResponse: OptionsResponse
) {
  const response = await getOrders(optionsResponse);

  if (response.ok) {
    const orders: Order[] = await response.json();
    const filteredOrders = orders.filter((order) => {
      const { odid } = order;
      if (odids.includes(odid)) {
        return false;
      } else {
        odids.push(odid);
        return true;
      }
    });

    return { filteredOrders, odids };
  } else {
    return { filteredOrders: [], odids };
  }
}

export default checkAndFilterOrders;
