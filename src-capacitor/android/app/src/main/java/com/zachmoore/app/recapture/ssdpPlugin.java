package com.zachmoore.app.recapture;

import android.content.Context;
import android.net.wifi.WifiManager;

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

  public static String parseHeaderValue(String content, String headerName) {
    Scanner s = new Scanner(content);
    s.nextLine();
    while (s.hasNextLine()) {
      String line = s.nextLine();
      int index = line.indexOf(':');

      if (index == -1) {
        return null;
      }
      String header = line.substring(0, index);
      if (headerName.equalsIgnoreCase(header.trim())) {
        return line.substring(index + 1).trim();
      }
    }
    return null;
  }

  private void createServiceObjWithXMLData(String url, final JSONObject jsonObj) {
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
          e.printStackTrace();
        }
      }
      @Override
      public void onFailure(int statusCode, Header[] headers, byte[] responseBody,
                            Throwable error) {
        System.out.print(new String(responseBody));
//        logger.log(Level.ALL, responseBody.toString());
      }
    });
  }

  @PluginMethod()
  public void search(PluginCall call){
    JSObject ret = new JSObject();
    ctx = getContext();

    mDeviceList = new JSONArray();

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

    if(wifi != null) {

      WifiManager.MulticastLock lock = wifi.createMulticastLock("The Lock");
      lock.acquire();

      InetSocketAddress srcAddress = new InetSocketAddress(Integer.parseInt(options.getString("PORT")));

      DatagramSocket socket = null;

      try {
          InetAddress group = InetAddress.getByName(options.getString("HOST"));
          int port = Integer.parseInt(options.getString("PORT"));
          String query =
            "M-SEARCH * HTTP/1.1\r\n" +
            "HOST: " + options.getString("HOST") + ":" + options.getString("PORT") + "\r\n" +
            "MAN: " + options.getString("MAN") + "\r\n" +
            "MX: " + options.getString("MX") + "\r\n" +
            "ST: " + options.getString("ST") + "\r\n" +
            "\r\n";

        // Send multi-cast packet
        DatagramPacket dgram = new DatagramPacket(query.getBytes(), query.length(),
          group, port);

        MulticastSocket multicast = null;
        try {
          multicast = new MulticastSocket(null);
          multicast.bind(srcAddress);
          multicast.setTimeToLive(4);
          multicast.send(dgram);
        } finally {
          if (multicast != null) {
            multicast.disconnect();
            multicast.close();
          }
        }

        socket = new DatagramSocket(port);
        socket.setReuseAddress(true);
        int timeout = Integer.parseInt(options.getString("TIMEOUT"));
        socket.setSoTimeout(timeout);

        socket.send(dgram);

        while (true) {
          try {
            DatagramPacket p = new DatagramPacket(new byte[1536], 1536);
            socket.receive(p);

            String s = new String(p.getData());
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
            ret.put("devices", mDeviceList);
            ret.put("addresses", addresses);
            ret.put("errors", errors);
            call.success(ret);
            return;
//            break;
          }

        }

      } catch (UnknownHostException e) {
        e.printStackTrace();
        errors.add("Error Unknown host" + e.getMessage());
        ret.put("devices", mDeviceList);
        ret.put("addresses", addresses);
        ret.put("errors", errors);
        call.resolve(ret);
      } catch (IOException e) {
        e.printStackTrace();
        errors.add("IO Error" + e.getMessage());
        ret.put("devices", mDeviceList);
        ret.put("addresses", addresses);
        ret.put("errors", errors);
        call.resolve(ret);
      }
      finally {
        if(socket != null) {
          socket.disconnect();
          socket.close();
        }
      }
      lock.release();
      return;
    }

    ret.put("devices", mDeviceList);
    ret.put("addresses", addresses);
    ret.put("errors", errors);
    call.resolve(ret);
  }
}
