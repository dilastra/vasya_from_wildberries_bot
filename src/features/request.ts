import fetch, { Response } from "node-fetch";

async function request(
  url: string,
  options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }
): Promise<Response> {
  return await fetch(url, options);
}

export default request;
