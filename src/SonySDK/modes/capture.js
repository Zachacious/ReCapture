import sony from "../methods";

const makeReturnData = (data, error) => {
  return { data: data, error: error };
};

const capture = {};

capture.initSession = async () => {
  // not all cameras require starting capture session
  // not sure how to deal with that yet
  const beginCaptureSession = await sony.beginCaptureSession();
  const liveView = await sony.startLiveView();

  // should containe endpoint for liveview image
  return liveView;
};

capture.endSession = async () => {
  const endLiveView = await sony.endLiveView();
  const endCaptureSession = await sony.endCaptureSession();

  return makeReturnData({ result: "passthrough" }, "");
};

export default capture;
