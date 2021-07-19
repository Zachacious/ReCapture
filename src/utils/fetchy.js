import sleep from "./sleep";

const defaultOptions = {
  url: "",
  retries: 1,
  retryDelay: -1,
  http: {},
};

const fetchy = async (options = defaultOptions) => {
  options = { ...defaultOptions, ...options };

  let res;
  let retries = options.retries;
  const retryDelay = options.retryDelay;

  return new Promise(async (resolve, reject) => {
    for (let i = 0; i < retries; ++i) {
      try {
        res = await fetch(options.url, options.http);
        return resolve(res);
      } catch (err) {
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
