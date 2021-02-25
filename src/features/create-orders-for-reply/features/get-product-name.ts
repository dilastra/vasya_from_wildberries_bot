import getProductPage from "../api";
import { load } from "cheerio";

async function getProductName(goodsId: number): Promise<string> {
  const response = await getProductPage(goodsId);
  const pageProduct = await response.text();
  const $ = load(pageProduct);
  const productName = $("span.name").text();

  return productName;
}

export default getProductName;
