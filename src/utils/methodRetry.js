import sleep from "./sleep.js";

export default async (method, retries = 1, delay = 0) => {
  let res;

  return new Promise(async (resolve, reject) => {
    for (let i = 0; i < retries; ++i) {
      try {
        res = await method();
        if (!res.data) throw new Error("No data returned");
        return resolve(res);
      } catch (err) {
        const isLastAttempt = i + 1 === retries;
        if (isLastAttempt) {
          console.error(`Method failed to return data after ${retries} tries.`);
          return reject(err);
        }

        if (delay > 0) await sleep(delay);
      }
    }
  });
};
