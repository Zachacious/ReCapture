import { boot } from "quasar/wrappers";

const customAlertProps = {
  open: null,
  close: null,
};

const customAlertDelegate = {
  setOpenCB: (cb) => (customAlertProps.open = cb),
  setCloseCB: (cb) => (customAlertProps.close = cb),
  open: (options) => {
    if (customAlertProps.open) customAlertProps.open(options);
  },
  close: () => {
    if (customAlertProps.close) customAlertProps.close();
  },
};

export default boot(({ app }) => {
  app.config.globalProperties.$alertDelegate = customAlertDelegate;
  app.config.globalProperties.$alert = (options) => {
    customAlertDelegate.open(options);
    return customAlertDelegate;
  };
});

export { customAlertDelegate as customAlert };
