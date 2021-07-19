export default (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms || 1000));
};
