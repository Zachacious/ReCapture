import { boot } from "quasar/wrappers";
import methodRetry from "../utils/methodRetry";

export default boot(({ app }) => {
  app.config.globalProperties.$methodRetry = methodRetry;
});
