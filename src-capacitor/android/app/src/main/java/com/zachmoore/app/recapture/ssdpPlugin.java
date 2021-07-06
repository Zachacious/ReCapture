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
import java.net.UnknownHostException;
import java.util.HashSet;
import java.util.Scanner;
import java.util.logging.Level;
import java.util.logging.Logger;

import cz.msebera.android.httpclient.Header;

@NativePlugin()
public class ssdpPlugin extends Plugin {

  Logger logger = Logger.getLogger(ssdpPlugin.class.getName());

  HashSet<String> addresses = new HashSet<>();
  private JSONArray mDeviceList = new JSONArray();
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
    Context ctx = getContext();
    SyncHttpClient syncRequest = new SyncHttpClient();
    syncRequest.get(ctx.getApplicationContext(), url, new AsyncHttpResponseHandler() {
      @Override
      public void onSuccess(int statusCode, Header[] headers, byte[] responseBody) {
        try {
          JSONObject device = jsonObj;
          device.put("xml", new String(responseBody));
          mDeviceList.put(device);
        } catch (JSONException e) {
          e.printStackTrace();
        }
      }
      @Override
      public void onFailure(int statusCode, Header[] headers, byte[] responseBody,
                            Throwable error) {
        logger.log(Level.ALL, responseBody.toString());
      }
    });
  }

  @PluginMethod()
  public void search(PluginCall call) {
    JSObject ret = new JSObject();

    Context ctx = getContext();
    WifiManager wifi = (WifiManager)ctx.getApplicationContext().getSystemService( ctx.getApplicationContext().WIFI_SERVICE );

    if(wifi != null) {

      WifiManager.MulticastLock lock = wifi.createMulticastLock("The Lock");
      lock.acquire();

      DatagramSocket socket = null;

      try {

        InetAddress group = InetAddress.getByName("239.255.255.250");
        int port = 1900;
        String query =
          "M-SEARCH * HTTP/1.1\r\n" +
            "HOST: 239.255.255.250:1900\r\n"+
            "MAN: \"ssdp:discover\"\r\n"+
            "MX: 1\r\n"+
            "ST: ssdp:all\r\n"+  // Use for Sonos
            "\r\n";

        socket = new DatagramSocket(port);
        socket.setReuseAddress(true);

        DatagramPacket dgram = new DatagramPacket(query.getBytes(), query.length(),
          group, port);
        socket.send(dgram);

        long time = System.currentTimeMillis();
        long curTime = System.currentTimeMillis();

        // Let's consider all the responses we can get in 1 second
        while (curTime - time < 1000) {
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
            }
            addresses.add(p.getAddress().getHostAddress());

          curTime = System.currentTimeMillis();
        }

      } catch (UnknownHostException e) {
        e.printStackTrace();
      } catch (IOException e) {
        e.printStackTrace();
      }
      finally {
        socket.close();
      }
      lock.release();
    }

    ret.put("devices", mDeviceList);
    logger.log(Level.ALL, mDeviceList.toString());
    ret.put("addresses", addresses);
    call.success(ret);
  }
}
