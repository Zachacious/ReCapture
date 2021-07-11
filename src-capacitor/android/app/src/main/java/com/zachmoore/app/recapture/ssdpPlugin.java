package com.zachmoore.app.recapture;

import android.content.Context;
import android.net.wifi.WifiManager;
import android.util.Log;

import com._8rine.upnpdiscovery.UPnPDevice;
import com._8rine.upnpdiscovery.UPnPDiscovery;
import com.getcapacitor.JSObject;
import com.getcapacitor.NativePlugin;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.loopj.android.http.AsyncHttpResponseHandler;
import com.loopj.android.http.SyncHttpClient;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;
import java.net.DatagramPacket;
import java.net.DatagramSocket;
import java.net.InetAddress;
import java.net.InetSocketAddress;
import java.net.MulticastSocket;
import java.net.SocketTimeoutException;
import java.net.UnknownHostException;
import java.util.HashSet;
import java.util.Scanner;

import cz.msebera.android.httpclient.Header;

//import java.util.logging.Level;
//import java.util.logging.Logger;

@NativePlugin()
public class ssdpPlugin extends Plugin {

//  Logger logger = Logger.getLogger(ssdpPlugin.class.getName());

  HashSet<String> addresses = new HashSet<>();
  HashSet<String> errors = new HashSet<>();
  JSONArray mDeviceList = new JSONArray();
  Context ctx;

  public String parseHeaderValue(String content, String headerName) {
    Scanner s = new Scanner(content);
    s.nextLine();
    while (s.hasNextLine()) {
      String line = s.nextLine();
      int index = line.indexOf(':');

      if (index == -1) {
        errors.add("parse error");
        return null;
      }
      String header = line.substring(0, index);
      if (headerName.equalsIgnoreCase(header.trim())) {
        return line.substring(index + 1).trim();
      }
    }
    errors.add("parse error");
    return null;
  }

  public void createServiceObjWithXMLData(String url, final JSONObject jsonObj) {
    errors.add(url);
    ctx = getContext();
    SyncHttpClient syncRequest = new SyncHttpClient();
    syncRequest.get(ctx.getApplicationContext(), url, new AsyncHttpResponseHandler() {
      @Override
      public void onSuccess(int statusCode, Header[] headers, byte[] responseBody) {
        try {
//          JSONObject jsonObj;
          jsonObj.put("xml", new String(responseBody));
          mDeviceList.put(jsonObj);
        } catch (JSONException e) {
          errors.add("XML error: " + e.getMessage());
          e.printStackTrace();
        }
      }
      @Override
      public void onFailure(int statusCode, Header[] headers, byte[] responseBody,
                            Throwable error) {
        System.out.print(new String(responseBody));
//        logger.log(Level.ALL, responseBody.toString());
        errors.add("XML error: " + new String(responseBody));
      }
    });
  }

  @PluginMethod()
  public void searchNew(PluginCall call) {
    UPnPDiscovery.discoveryDevices(getActivity(), new UPnPDiscovery.OnDiscoveryListener() {
      JSObject ret = new JSObject();

      @Override
      public void OnStart() {
        Log.d("UPnPDiscovery", "Starting discovery");
      }

      @Override
      public void OnFoundNewDevice(UPnPDevice device) {
        Log.d("UPnPDiscovery", "Found new device: " + device.toString());
        // String friendlyName = device.getFriendlyName();
        // ... see UPnPDevice description below

        ret.put(device.getFriendlyName(), device);
      }

      @Override
      public void OnFinish(HashSet<UPnPDevice> devices) {
        Log.d("UPnPDiscovery", "Finish discovery");
        call.success(ret);
      }

      @Override
      public void OnError(Exception e) {
        Log.d("UPnPDiscovery", "Error: " + e.getLocalizedMessage());
        call.error(e.getLocalizedMessage());
      }
    });
  }

  @PluginMethod()
  public void search(PluginCall call){
    JSObject ret = new JSObject();
    ctx = getContext();

    mDeviceList = new JSONArray();
    addresses = new HashSet<>();
    errors = new HashSet<>();

    JSObject defaultOptions = new JSObject();
    defaultOptions.put("ST", "ssdp:all");
    defaultOptions.put("HOST", "239.255.255.250");
    defaultOptions.put("MAN", "ssdp:discover");
    defaultOptions.put("MX", "1");
    defaultOptions.put("PORT", "1900");
    defaultOptions.put("TIMEOUT", "3000");

    JSObject options = call.getObject("options", defaultOptions);

    if (!options.has("ST")) {
      options.put("ST", "ssdp:all");
    }
    if (!options.has("HOST")) {
      options.put("HOST", "239.255.255.250");
    }
    if (!options.has("MAN")) {
      options.put("MAN", "ssdp:discover");
    }
    if (!options.has("MX")) {
      options.put("MX", "1");
    }
    if (!options.has("PORT")) {
      options.put("PORT", "1900");
    }
    if (!options.has("TIMEOUT")) {
      options.put("TIMEOUT", "3000");
    }

    WifiManager wifi = (WifiManager)ctx.getApplicationContext().getSystemService( ctx.getApplicationContext().WIFI_SERVICE );

//    if(wifi != null) {

      WifiManager.MulticastLock lock = wifi.createMulticastLock("The Lock");
      lock.acquire();

    int port = Integer.parseInt(options.getString("PORT"));

      InetSocketAddress srcAddress = new InetSocketAddress(port);

      DatagramSocket socket = null;
//        MulticastSocket socket = null;

      try {
//          InetAddress group = InetAddress.getByName(options.getString("HOST"));

        String query =
          "M-SEARCH * HTTP/1.1\r\n" +
            "MAN: " + options.getString("MAN") + "\r\n" +
            "MX: " + options.getString("MX") + "\r\n" +
            "HOST: " + options.getString("HOST") + ":" + options.getString("PORT") + "\r\n" +
            "ST: " + options.getString("ST") + "\r\n" +
            "USER-AGENT: Recapture SSDP\r\n" +
            "\r\n";

//          String query =
//            "M-SEARCH * HTTP/1.1\r\n" +
//            "HOST: " + options.getString("HOST") + ":" + options.getString("PORT") + "\r\n" +
//            "MAN: " + options.getString("MAN") + "\r\n" +
//            "MX: " + options.getString("MX") + "\r\n" +
//            "ST: " + options.getString("ST") + "\r\n" +
//            "USER-AGENT: Recapture SSDP\r\n" +
//            "\r\n";

//          errors.add(query);

        // Send multi-cast packet
        InetSocketAddress dstAddress = new InetSocketAddress(InetAddress.getByName(options.getString("HOST")), port);
//        DatagramPacket dgram = new DatagramPacket(query.getBytes(), query.length(),
//          group, port);
        byte[] queryBytes = query.getBytes();
        DatagramPacket dgram = new DatagramPacket(queryBytes, queryBytes.length,
          dstAddress);

        int timeout = Integer.parseInt(options.getString("TIMEOUT"));

        MulticastSocket multicast = null;
        try {
          multicast = new MulticastSocket(null);
          multicast.bind(srcAddress);
          multicast.setTimeToLive(4);
          multicast.send(dgram);
//          multicast.setSoTimeout(3000);
//          multicast.setReuseAddress(true);
        } finally {
          if (multicast != null) {
            multicast.disconnect();
            multicast.close();
          }
        }

        socket = new DatagramSocket(port);
//        socket = new MulticastSocket(port);
        socket.setReuseAddress(true);
        socket.setBroadcast(true);
        socket.bind(new InetSocketAddress(port));

        socket.setSoTimeout(timeout);
        socket.send(dgram);

        while (true) {
          try {
//            DatagramPacket p = new DatagramPacket(new byte[8192], 8192);
            DatagramPacket p = new DatagramPacket(queryBytes, query.length(), srcAddress)
            socket.receive(p);

            String s = new String(p.getData());
            errors.add(parseHeaderValue(s, "LOCATION"));
            try {
              JSONObject device = new JSONObject();
              device.put("USN", parseHeaderValue(s, "USN"));
              device.put("LOCATION", parseHeaderValue(s, "LOCATION"));
              device.put("ST", parseHeaderValue(s, "ST"));
              device.put("Server", parseHeaderValue(s, "Server"));
              createServiceObjWithXMLData(parseHeaderValue(s, "LOCATION"), device);
            } catch (JSONException e) {
              e.printStackTrace();
              errors.add("Error converting xml");
            }

            addresses.add(p.getAddress().getHostAddress());
          } catch (SocketTimeoutException e) {
              e.printStackTrace();
              errors.add("Error socket timeout: " + e.getMessage());
//            socket.disconnect();
//            socket.close();
//            ret.put("devices", mDeviceList);
//            ret.put("addresses", addresses);
//            ret.put("errors", errors);
//            call.success(ret);
//            return;
            break;
          }

        }

      } catch (UnknownHostException e) {
        e.printStackTrace();
//        errors.add("Error Unknown host" + e.getMessage());
        call.error("Error Unknown Host");

      } catch (IOException e) {
        e.printStackTrace();
//        errors.add("IO Error" + e.getMessage());
        call.error("Error IO Exception");
      }
      finally {
        if(socket != null) {
          socket.disconnect();
          socket.close();
        }

        ret.put("devices", mDeviceList);
        ret.put("addresses", addresses);
        ret.put("errors", errors);
        call.resolve(ret);
      }
      lock.release();
//      return;
//    }

    ret.put("devices", mDeviceList);
    ret.put("addresses", addresses);
    ret.put("errors", errors);
    call.resolve(ret);
  }
}
