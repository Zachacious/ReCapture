import { boot } from "quasar/wrappers";
import events from "../utils/events";

export default boot(({ app }) => {
  app.config.globalProperties.$events = events;
});

// export { events };
