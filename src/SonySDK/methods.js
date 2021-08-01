import bodies from "./apiBodies";
import connection from "../utils/connection";
// import events from "../utils/events";

const makeReturnData = (data, error) => {
  return { data: data, error: error };
};

let sony = {};

sony.getAvailableMethods = async () => {
  console.log("get available methods");
  if (!connection.isConnected) return makeReturnData(null, "Not connected");

  let calls;

  try {
    calls = await connection.makeAPICall(bodies.getAvailableApiList);
    calls = calls[0];
    // console.log("Available Methods: ", calls);
    return makeReturnData(calls, null);
  } catch (err) {
    return makeReturnData(null, err);
  }
};

// not every camera needs this
sony.beginCaptureSession = async () => {
  console.log("begin capature session");
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
  console.log("end capture session");
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
  console.log("get event");
  //   if (!connection.isConnected) return makeReturnData(null, "Not connected");

  let res;

  try {
    res = await connection.makeAPICall(bodies.getEvent);
    console.log(res);
    return makeReturnData(res, res ? null : "Unable to get event");
  } catch (err) {
    console.error(err);
    return makeReturnData(null, err);
  }
};

sony.checkConnection = async () => {
  console.log("check connection");
  if (!connection.isConnected) return makeReturnData(null, "Not connected");

  const res = await sony.getEvent();
  const status = !res.error && res.data ? true : false;
  console.log(!res.error && res.data ? "Connection GOOD!" : "Connection BAD!");
  if (!status) connection.setDisconnected();
  return makeReturnData(status, null);
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
  console.log("get camera status");
  if (!connection.isConnected) return makeReturnData(null, "Not connected");

  const camEvents = await sony.getEvent();
  if (camEvents.error || !camEvents.data) return camEvents;

  const camStatus = await sony.getEventProperty("cameraStatus", camEvents.data);

  return makeReturnData(
    camStatus,
    camStatus ? null : "Unable to get camera status"
  );
};

sony.halfPressShutter = async () => {
  console.log("half press shutter");
  if (!connection.isConnected) return makeReturnData(null, "Not connected");

  const camEvents = await sony.getEvent();
  if (camEvents.error || !camEvents.data) return camEvents;

  try {
    const res = await connection.makeAPICall(bodies.actHalfPressShutter);
    console.log(res);
  } catch (err) {
    console.error(err);
    return makeReturnData(null, err);
  }
};

sony.cancelHalfPressShutter = async () => {
  console.log("cancel half press shutter");
  if (!connection.isConnected) return makeReturnData(null, "Not connected");

  const camEvents = await sony.getEvent();
  if (camEvents.error || !camEvents.data) return camEvents;

  try {
    const res = await connection.makeAPICall(bodies.cancelHalfPressShutter);
    console.log(res);
  } catch (err) {
    console.error(err);
    return makeReturnData(null, err);
  }
};

// sony.test = async () => {
//   console.log("test");
//   if (!connection.isConnected) return makeReturnData(null, "Not connected");
//   const res = await sony.getAvailableMethods();
//   console.log(res);

//   try {
//     console.log(await connection.makeAPICall(bodies.getMethodTypes));
//   } catch (err) {
//     console.error(err);
//   }

//   console.log(
//     "setaf pos",
//     await connection.makeAPICall(bodies.setTouchAFPosition)
//   );

//   try {
//     console.log(await connection.makeAPICall(bodies.getEvent));
//   } catch (err) {
//     console.error(err);
//   }

//   // try to set liveview frame info ?? why not working ??
//   try {
//     console.log(
//       "Attempt set frame info on",
//       await connection.makeAPICall(bodies.enableLiveviewFrameInfo)
//     );
//   } catch (err) {
//     console.error(err);
//   }
// };

sony.startLiveView = async () => {
  console.log("start live view");
  if (!connection.isConnected) return makeReturnData(null, "Not connected");

  const calls = await sony.getAvailableMethods();
  if (calls.error) return calls;

  if (!calls.data.includes("startLiveview")) {
    return makeReturnData(null, "Error start live view not available");
  }

  try {
    console.log(
      "Attempt to set Still mode on",
      await connection.makeAPICall(bodies.setShootModeStill)
    );
  } catch (err) {
    console.log(err);
  }

  // try to set liveview frame info ?? why not working ??
  try {
    console.log(
      "Attempt set frame info on",
      await connection.makeAPICall(bodies.enableLiveviewFrameInfo)
    );
  } catch (err) {
    console.error(err);
  }

  try {
    const res = await connection.makeAPICall(bodies.startLiveviewWithSizeLarge);
    const success = res[0];
    if (!success) throw "Unable to start live view Large";
    return makeReturnData(res, null);
  } catch (err) {
    console.error(err);

    try {
      const res = await connection.makeAPICall(bodies.startLiveview);
      const success = res[0];
      return makeReturnData(res, !success ? "Unable to start live view" : null);
    } catch (err) {
      console.log(err);
      return makeReturnData(null, err);
    }
  }
};

sony.endLiveView = async () => {
  console.log("end live view");
  if (!connection.isConnected) return makeReturnData(null, "Not connected");

  const calls = await sony.getAvailableMethods();
  if (calls.error) return calls;

  if (!calls.data.includes("endLiveview")) {
    return makeReturnData(null, "Error end live view not available");
  }

  try {
    const res = await connection.makeAPICall(bodies.stopLiveview);
    const success = res[0];
    return makeReturnData(res, !success ? "Unable to end live view" : null);
  } catch (err) {
    console.log(err);
    return makeReturnData(null, err);
  }
};

sony.getAvailableShootMode = async () => {
  console.log("get supported shoot modes");
  if (!connection.isConnected) return makeReturnData(null, "Not connected");

  const calls = await sony.getAvailableMethods();
  if (calls.error) return calls;

  if (!calls.data.includes("getAvailableShootMode")) {
    return makeReturnData(
      null,
      "Error get supported shoot modes not available"
    );
  }

  try {
    const res = await connection.makeAPICall(bodies.getAvailableShootMode);
    console.log(res);
    return makeReturnData(
      res,
      res ? null : "Unable to get supported shoot modes"
    );
  } catch {
    return makeReturnData(null, "Unable to get supported shoot modes");
  }
};

export default sony;
