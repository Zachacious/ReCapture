package zm.recapture.app;

import android.os.Bundle;

import com.getcapacitor.BridgeActivity;

import com.getcapacitor.Plugin;

//import java.util.ArrayList;

import zm.recapture.app.SSDPPlugin;

public class MainActivity extends BridgeActivity {
@Override
  public void onCreate(Bundle savedInstanceState) {
  super.onCreate(savedInstanceState);
  registerPlugin(SSDPPlugin.class);
//  this.init(savedInstanceState, new ArrayList<Class<? extends Plugin>>() {{
//    add(SSDPPlugin.class);
//  }});
}
}
