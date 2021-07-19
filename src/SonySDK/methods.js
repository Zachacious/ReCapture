import bodies from "./apiBodies";
import connection from "../boot/connection";

const makeReturnData = (data, error) => {
  return { data: data, error: error };
};

let sony = {};

sony.getAvailableMethods = async () => {
  let calls;

  try {
    calls = await connection.makeAPICall(bodies.getAvailableApiList);
    calls = calls.result[0];
    return makeReturnData(calls, null);
  } catch (err) {
    console.error(err);
    return makeReturnData(null, err);
  }
};

// not every camera needs this
sony.beginCaptureSession = async () => {
  const calls = await sony.getAvailableMethods();

  if (calls.error) return calls;

  if (!calls.data.includes("startRecMode")) {
    return makeReturnData(null, "Error start record mode not available");
  }

  try {
    res = await connection.makeAPICall(bodies.startRecMode);
    const success = res.result[0] === 0;
    return makeReturnData(res, !success ? "Unable to start record mode" : null);
  } catch (err) {
    console.error(err);
    return makeReturnData(null, err);
  }
};

sony.endCaptureSession = async () => {
  const calls = await sony.getAvailableMethods();

  if (calls.error) return calls;

  if (!calls.data.includes("stopRecMode")) {
    return makeReturnData(null, "Error stop record mode not available");
  }

  try {
    res = await connection.makeAPICall(bodies.stopRecMode);
    const success = res.result[0] === 0;
    return makeReturnData(res, !success ? "Unable to stop record mode" : null);
  } catch (err) {
    console.error(err);
    return makeReturnData(null, err);
  }
};

sony.getEvent = async () => {
  let res;

  try {
    res = await connection.makeAPICall(bodies.getEvent);
    return makeReturnData(res, null);
  } catch (err) {
    console.error(err);
    return makeReturnData(null, err);
  }
};

sony.getEventProperty = async (prop, events) => {
  try {
    const evtProperty = events.find((p) => {
      if (p) return p.type === prop;
    });
    return evtProperty;
  } catch (err) {
    console.error(err);
  }
};

sony.getCameraStatus = async () => {
  const camEvents = await sony.getEvent();
  if (camEvents.error) return camEvents;

  const camStatus = await sony.getEventProperty("cameraStatus", camEvents.data);

  return makeReturnData(camStatus, null);
};

sony.startLiveView = async () => {
  const camStatus = await sony.getCameraStatus();
  if (camStatus.error) return camStatus;
  if (camStatus.data.status !== "idle") {
    return makeReturnData(null, "Camera is not idle");
  }

  const calls = await sony.getAvailableMethods();
  if (calls.error) return calls;

  if (!calls.data.includes("startLiveView")) {
    return makeReturnData(null, "Error start live view not available");
  }

  try {
    const res = await connection.makeAPICall(bodies.startLiveview);
    const success = res.result[0];
    return makeReturnData(res, !success ? "Unable to start live view" : null);
  } catch (err) {
    console.log(err);
    return makeReturnData(null, err);
  }
};

sony.endLiveView = async () => {
  const camStatus = await sony.getCameraStatus();
  if (camStatus.error) return camStatus;
  if (camStatus.data.status !== "idle") {
    return makeReturnData(null, "Camera is not idle");
  }

  const calls = await sony.getAvailableMethods();
  if (calls.error) return calls;

  if (!calls.data.includes("endLiveview")) {
    return makeReturnData(null, "Error end live view not available");
  }

  try {
    const res = await connection.makeAPICall(bodies.startLiveview);
    const success = res.result[0];
    return makeReturnData(res, !success ? "Unable to end live view" : null);
  } catch (err) {
    console.log(err);
    return makeReturnData(null, err);
  }
};

export default sony;
