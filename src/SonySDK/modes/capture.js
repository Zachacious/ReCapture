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
  //   console.log(liveView);
  return liveView;
};

capture.endSession = async () => {
  const endLiveView = await sony.endLiveView();
  console.log("live view ended");
  const endCaptureSession = await sony.endCaptureSession();
  console.log("capture session ended");

  return makeReturnData({ result: "passthrough" }, "");
};

capture.getLiveViewStatus = async () => {
  const events = await sony.getEvent();
  const status = await sony.getEventProperty("liveviewStatus", events.data);
  return status.liveviewStatus;
};

export default capture;
