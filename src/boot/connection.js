import { boot } from "quasar/wrappers";
import parseXML from "../utils/parseXML";

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

const parseDeviceInfo = (device) => {
  const { xml } = device;

  const deviceInfo = {
    name: "",
    api: {
      version: "",
      url: "",
    },
  };

  if (!xml) return deviceInfo;

  const xmlDoc = new DOMParser().parseFromString(xml, "text/xml");

  console.log(parseXML(xmlDoc));

  // stringParserXML(xml, (err, result) => {
  //   if (err) return console.error(err);

  //   deviceInfo.name = result.root.device[0].friendlyName[0];
  //   deviceInfo.api.version = `${result.root.specVersion[0].major[0]}.${result.root.specVersion[0].minor[0]}`;
  //   deviceInfo.api.url =
  //     result.root.device[0]["av:X_ScalarWebAPI_DeviceInfo"][0][
  //       "av:X_ScalarWebAPI_ServiceList"
  //     ][0]["av:X_ScalarWebAPI_Service"][0][
  //       "av:X_ScalarWebAPI_ActionList_URL"
  //     ][0];

  //   return deviceInfo;
  // });
};

let connection = {
  isConnected: false,
  cameraInfo: {},
  device: {},
};

connection.setDevice = (device) => {
  try {
    connection.device = device;
    connection.isConnected = true;
    connection.cameraInfo = parseDeviceInfo(device);
  } catch (err) {
    console.error(err);
    connection.isConnected = false;
    connection.cameraInfo = {};
    connection.device = {};
  }
};

// TODO: remove in live app
connection.setDevice(testData.devices[0]);

export default boot(({ app }) => {
  app.config.globalProperties.$connection = connection;
});

export { connection };
