import parseXML from "../utils/parseXML";
import events from "../utils/events";
import { fetchy } from "../utils/fetchy";

let connection = {
  isConnected: false,
  data: {},
  endpoint: "",
};

connection.setDisconnected = () => {
  connection.isConnected = false;
  connection.data = {};
  connection.endpoint = "";
  events.emit(`connection.disconnected`);
};

connection.setConnectedDevice = (device) => {
  try {
    const { xml } = device;
    if (!xml) return;

    const xmlDoc = new DOMParser().parseFromString(xml, "text/xml");
    const deviceInfo = parseXML(xmlDoc);

    connection.data = deviceInfo;
    connection.isConnected = true;

    try {
      connection.endpoint =
        connection.data.device["av:X_ScalarWebAPI_DeviceInfo"][
          "av:X_ScalarWebAPI_ServiceList"
        ][0]["av:X_ScalarWebAPI_ActionList_URL"];
    } catch (err) {
      console.log(
        "Unable to retrieve camera endpoint... possible disconnected"
      );
      console.error(err);
      connection.setDisconnected();
      return;
    }
  } catch (err) {
    console.error(err);
    connection.setDisconnected();
  }
};

connection.makeAPICall = async (body) => {
  try {
    const res = await fetchy.POST({
      url: `${connection.endpoint}/camera`,
      retries: 3,
      retryDelay: 250,
      http: {
        body: JSON.stringify(body),
      },
    });

    const jsonres = await res.json();
    return jsonres;
  } catch (err) {
    console.error("failed to make camera api call");
  }
};

export default connection;
