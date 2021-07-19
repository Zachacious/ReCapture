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

  if (!liveView.data || liveView.error) return liveView;

  // should containe endpoint for liveview image
  return liveView.data;
};

capture.endSession = async () => {
  const endLiveView = await sony.endLiveView();
  const endCaptureSession = await sony.endCaptureSession();
};

export default capture;
