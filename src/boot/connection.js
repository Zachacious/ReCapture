import { boot } from "quasar/wrappers";
import parseXML from "../utils/parseXML";
import events from "../utils/events";

const testData = {
  devices: [
    {
      LOCATION: `http://192.168.122.1:61000/scalarwebapi_dd.xml`,
      xml: `<?xml version="1.0"?><root xmlns="urn:schemas-upnp-org:device-1-0">
  <specVersion>
    <major>1</major>
    <minor>0</minor>
  </specVersion>
  <device>
    <deviceType>urn:schemas-upnp-org:device:Basic:1</deviceType>
    <friendlyName>ILCE-7RM2</friendlyName>
    <manufacturer>Sony Corporation</manufacturer>
    <manufacturerURL>http://www.sony.net/</manufacturerURL>
    <modelDescription>SonyDigitalMediaServer</modelDescription>
    <modelName>SonyImagingDevice</modelName>
    <UDN>uuid:000000001000-1010-8000-1A48CAE11526</UDN>
    <serviceList>
      <service>
        <serviceType>urn:schemas-sony-com:service:ScalarWebAPI:1</serviceType>
        <serviceId>urn:schemas-sony-com:serviceId:ScalarWebAPI</serviceId>
        <SCPDURL/>
        <controlURL/>
        <eventSubURL/>
      </service>
      <service>
        <serviceType>urn:schemas-sony-com:service:DigitalImaging:1</serviceType>
        <serviceId>urn:schemas-sony-com:serviceId:DigitalImaging</serviceId>
        <SCPDURL>/DigitalImagingDesc.xml</SCPDURL>
        <controlURL>/upnp/control/DigitalImaging</controlURL>
        <eventSubURL></eventSubURL>
      </service>
    </serviceList>
    <av:X_ScalarWebAPI_DeviceInfo xmlns:av="urn:schemas-sony-com:av">
      <av:X_ScalarWebAPI_Version>1.0</av:X_ScalarWebAPI_Version>
      <av:X_ScalarWebAPI_ServiceList>
        <av:X_ScalarWebAPI_Service>
          <av:X_ScalarWebAPI_ServiceType>guide</av:X_ScalarWebAPI_ServiceType>
          <av:X_ScalarWebAPI_ActionList_URL>http://192.168.122.1:8080/sony</av:X_ScalarWebAPI_ActionList_URL>
          <av:X_ScalarWebAPI_AccessType/>
        </av:X_ScalarWebAPI_Service>
        <av:X_ScalarWebAPI_Service>
          <av:X_ScalarWebAPI_ServiceType>accessControl</av:X_ScalarWebAPI_ServiceType>
          <av:X_ScalarWebAPI_ActionList_URL>http://192.168.122.1:8080/sony</av:X_ScalarWebAPI_ActionList_URL>
          <av:X_ScalarWebAPI_AccessType/>
        </av:X_ScalarWebAPI_Service>
        <av:X_ScalarWebAPI_Service>
          <av:X_ScalarWebAPI_ServiceType>camera</av:X_ScalarWebAPI_ServiceType>
          <av:X_ScalarWebAPI_ActionList_URL>http://192.168.122.1:8080/sony</av:X_ScalarWebAPI_ActionList_URL>
          <av:X_ScalarWebAPI_AccessType/>
        </av:X_ScalarWebAPI_Service>
      </av:X_ScalarWebAPI_ServiceList>
    </av:X_ScalarWebAPI_DeviceInfo>
  </device>
  </root>
  `,
    },
  ],
};

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
    const res = await fetch(`${endpoint}/camera`, {
      method: "POST",
      body: JSON.stringify(body),
    });
    const jsonres = await res.json();
    return jsonres;
  } catch (err) {
    console.log(err);
    connection.setDisconnected();
  }
};

// TODO: remove in live app
connection.setConnectedDevice(testData.devices[0]);
console.log(connection);

export default boot(({ app }) => {
  app.config.globalProperties.$connection = connection;
});

export { connection };
