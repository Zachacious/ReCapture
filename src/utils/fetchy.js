import sleep from "./sleep";

const cache = {
  // {uid: 'sdfsdf', interval: null}
  data: [],
};

cache.add = (uid, interval) => {
  cache.data.push({ uid: uid, interval: interval });
};

cache.remove = (uid) => {
  const cacheItem = cache.data.find((item) => item.uid === uid);
  if (cacheItem) clearInterval(cacheItem.interval);
  cache.data = cache.data.filter((item) => item.uid !== uid);
};

const defaultOptions = {
  url: "",
  retries: 1,
  retryDelay: -1,
  http: {},
};

const fetchy = async (options = defaultOptions) => {
  options = { ...defaultOptions, ...options };
  let response = null;
  let retries = 0;

  while (retries < options.retries) {
    try {
      response = await fetch(options.url, options.http);
      const data = await response.json();
      return data;
    } catch (e) {
      if (options.retryDelay > 0) {
        await sleep(options.retryDelay);
      }
      retries++;
    }
  }

  if (retries >= options.retries) {
    throw new Error(`Fetch failed after ${retries} retries`);
  }

  return response;
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
