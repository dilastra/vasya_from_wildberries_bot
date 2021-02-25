import { OptionsResponse } from "../../../types";
import request from "../../request";
import { Response } from "node-fetch";

async function requestToGetOrders(
  optionsResponse: OptionsResponse
): Promise<Response> {
  const { dateComingOrders, apiKeyWildberries } = optionsResponse;
  const url = `https://suppliers-stats.wildberries.ru/api/v1/supplier/orders?dateFrom=${dateComingOrders}&flag=1&key=${apiKeyWildberries}`;
  return await request(url);
}

export default requestToGetOrders;
