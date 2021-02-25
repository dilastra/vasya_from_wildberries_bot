import { Response } from "node-fetch";
import request from "../../request";

async function getProductPage(goodsId: number): Promise<Response> {
  const uri = `https://www.wildberries.ru/catalog/${goodsId}/detail.aspx`;
  return await request(uri);
}

export default getProductPage;
