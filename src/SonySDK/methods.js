import bodies from "./apiBodies";
import connection from "../utils/connection";
// import events from "../utils/events";

const makeReturnData = (data, error) => {
  return { data: data, error: error };
};

let sony = {};

sony.getAvailableMethods = async () => {
  if (!connection.isConnected) return makeReturnData(null, "Not connected");

  let calls;

  try {
    calls = await connection.makeAPICall(bodies.getAvailableApiList);
    calls = calls[0];
    return makeReturnData(calls, null);
  } catch (err) {
    return makeReturnData(null, err);
  }
};

// not every camera needs this
sony.beginCaptureSession = async () => {
  if (!connection.isConnected) return makeReturnData(null, "Not connected");

  const calls = await sony.getAvailableMethods();

  if (calls.error) return calls;

  if (!calls.data.includes("startRecMode")) {
    return makeReturnData(null, "Error start record mode not available");
  }

  try {
    const res = await connection.makeAPICall(bodies.startRecMode);
    const success = res[0] === 0;
    return makeReturnData(res, !success ? "Unable to start record mode" : null);
  } catch (err) {
    console.error(err);
    return makeReturnData(null, err);
  }
};

sony.endCaptureSession = async () => {
  if (!connection.isConnected) return makeReturnData(null, "Not connected");

  const calls = await sony.getAvailableMethods();

  if (calls.error) return calls;
  if (!calls.data.includes("stopRecMode")) {
    return makeReturnData(null, "Error stop record mode not available");
  }

  try {
    const res = await connection.makeAPICall(bodies.stopRecMode);
    const success = res[0] === 0;
    return makeReturnData(res, !success ? "Unable to stop record mode" : null);
  } catch (err) {
    console.error(err);
    return makeReturnData(null, err);
  }
};

sony.getEvent = async () => {
  if (!connection.isConnected) return makeReturnData(null, "Not connected");

  let res;

  try {
    res = await connection.makeAPICall(bodies.getEvent);
    return makeReturnData(res, res ? null : "Unable to get event");
  } catch (err) {
    console.error(err);
    return makeReturnData(null, err);
  }
};

sony.checkConnection = async () => {
  if (!connection.isConnected) return makeReturnData(null, "Not connected");

  const res = await sony.getEvent();
  console.log(!res.error && res.data ? "Connection GOOD!" : "Connection BAD!");
  if (res.error || !res.data) connection.setDisconnected();
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
  if (!connection.isConnected) return makeReturnData(null, "Not connected");

  const camEvents = await sony.getEvent();
  if (camEvents.error || !camEvents.data) return camEvents;

  const camStatus = await sony.getEventProperty("cameraStatus", camEvents.data);

  return makeReturnData(
    camStatus,
    camStatus ? null : "Unable to get camera status"
  );
};

sony.startLiveView = async () => {
  if (!connection.isConnected) return makeReturnData(null, "Not connected");

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
  if (!connection.isConnected) return makeReturnData(null, "Not connected");

  const camStatus = await sony.getCameraStatus();
  console.log(camStatus);
  if (camStatus.error || !camStatus.data) return camStatus;
  if (camStatus.data.cameraStatus !== "idle") {
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
