import sleep from "./sleep.js";

export default async (method, retries = 1, delay = 0) => {
  let res;
  let retry = 0;

  while (retry < retries) {
    try {
      res = await method();
      if (!res.data) throw new Error("No data returned");
      return res;
    } catch (e) {
      if (delay > 0) await sleep(delay);
      retry++;
    }
  }

  return res;
};
