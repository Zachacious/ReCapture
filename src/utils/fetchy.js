import sleep from "./sleep";
import "@capacitor-community/http";
import { Plugins } from "@capacitor/core";

const defaultOptions = {
  retries: 1,
  retryDelay: -1,
  http: {
    url: "",
    method: "GET",
    data: null,
  },
};

// const httpFetch = async (options) => {
//   switch (options.method) {
//     case "GET":
//       return await Http.get(options.http);
//     case "POST":
//       return await Http.post(options.http);
//     case "PUT":
//       return await Http.put(options.http);
//     case "DELETE":
//       return await Http.delete(options.http);
//     case "HEAD":
//       return await Http.head(options.http);
//     case "OPTIONS":
//       return await Http.options(options.http);
//     case "PATCH":
//       return await Http.patch(options.http);
//     default:
//       throw new Error(`Unsupported HTTP method: ${options.method}`);
//   }
// };

const fetchy = async (options = defaultOptions) => {
  options = { ...defaultOptions, ...options };
  // console.log(options);

  let res;
  let retries = options.retries;
  const retryDelay = options.retryDelay;

  return new Promise(async (resolve, reject) => {
    for (let i = 0; i < retries; ++i) {
      try {
        const { Http } = Plugins;
        res = await Http.request(options.http);
        console.log("res: ", res);
        if (!res.data.id === 1 && !res.data.id === 0)
          throw new Error(res.data.result);
        return resolve(res);
      } catch (err) {
        console.log(err);
        const isLastAttempt = i + 1 === retries;
        if (isLastAttempt) {
          console.error(`Fetch failed after ${retries} tries.`);
          return reject(err);
        }

        if (retryDelay > 0) await sleep(retryDelay);
      }
    }
  });
};

fetchy.startStream = (
  options = defaultOptions,
  callback = (data) => console.log(data)
) => {
  options = { ...defaultOptions, ...options };

  let res;
  let retries = options.retries;
  const retryDelay = options.retryDelay;

  return new Promise(async (resolve, reject) => {
    for (let i = 0; i < retries; ++i) {
      try {
        const { Http } = Plugins;
        res = await Http.startStream(options.http, callback);
        console.log("res: ", res);
        return resolve(res);
      } catch (err) {
        console.log(err);
        const isLastAttempt = i + 1 === retries;
        if (isLastAttempt) {
          console.error(`Start stream failed after ${retries} tries.`);
          return reject(err);
        }

        if (retryDelay > 0) await sleep(retryDelay);
      }
    }
  });
};

fetchy.clearStream = (id) => {
  let res;
  let retries = options.retries;
  const retryDelay = options.retryDelay;

  return new Promise(async (resolve, reject) => {
    for (let i = 0; i < retries; ++i) {
      try {
        const { Http } = Plugins;
        res = await Http.clearStream(id);
        console.log("res: ", res);
        return resolve(res);
      } catch (err) {
        console.log(err);
        const isLastAttempt = i + 1 === retries;
        if (isLastAttempt) {
          console.error(`Start stream failed after ${retries} tries.`);
          return reject(err);
        }

        if (retryDelay > 0) await sleep(retryDelay);
      }
    }
  });
};

fetchy.GET = (options = defaultOptions) => {
  options.http.method = "GET";
  return fetchy(options);
};

fetchy.POST = (options = defaultOptions) => {
  options.http.method = "POST";
  return fetchy(options);
};

fetchy.PUT = (options = defaultOptions) => {
  options.http.method = "PUT";
  return fetchy(options);
};

fetchy.DELETE = (options = defaultOptions) => {
  options.http.method = "DELETE";
  return fetchy(options);
};

fetchy.HEAD = (options = defaultOptions) => {
  options.http.method = "HEAD";
  return fetchy(options);
};

fetchy.OPTIONS = (options = defaultOptions) => {
  options.http.method = "OPTIONS";
  return fetchy(options);
};

fetchy.PATCH = (options = defaultOptions) => {
  options.http.method = "PATCH";
  return fetchy(options);
};

export { fetchy };
