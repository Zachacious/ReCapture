import { boot } from "quasar/wrappers";

const connection = {
  isConnected: false,
  cameraInfo: {},
  device: {},
};

export default boot(({ app }) => {
  app.config.globalProperties.$connection = connection;
});

export { connection };
