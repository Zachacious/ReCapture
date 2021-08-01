let sony = {};

sony.getMethodTypesVersion = 1.0;

sony.setTimeReq = {
  dateTime: "2014-04-01T21:35:43Z",
  timeZoneOffsetMinute: 540,
  dstOffsetMinute: 0,
};

sony.autoPowerOffSec = 60;

sony.seekStreamingPos = 1500; // milliseconds

sony.remotePlay = {
  type: "simpleStreaming",
  uri: "video:content?contentId=xxxxxxxxx",
};

sony.getContentCountReq = {
  uri: "storage:memoryCard1",
  target: "all",
  view: "date", // or flat
};

sony.loopRecTimeMin = 10;

sony.intervalTimeSec = 10;

sony.colorSetting = "Neutral";

sony.scene = "Under Water";

sony.viewAngle = 120;

sony.movie = {
  fileFormat: "XAVC S",
  quality: "HQ",
};

sony.postviewImageSize = "Original";

sony.stills = {
  aspectRatio: "4:3",
  size: "5M",
  quality: "RAW+JPEG",
};

sony.touchAFPos = {
  x: 23.4,
  y: 45.6,
};

sony.trackingFocusPos = {
  x: 23.4,
  y: 45.6,
};

sony.selfTimerSeconds = 2;

sony.exposureCompensation = 2;

sony.fStop = 5.6;

sony.shutterSpeed = "1/2";

sony.iso = 400;

sony.whiteBalance = {
  param: "Color Temperature",
  enabled: true,
  value: 2500,
};

// =============================================================

sony = {
  ...sony,
  // returns
  /*{
 "result": [0],
 "id": 1
} */
  setShootModeStill: {
    method: "setShootMode",
    params: ["still"],
    id: 1,
    version: "1.0",
  },
  setShootModeMovie: {
    method: "setShootMode",
    params: ["movie"],
    id: 1,
    version: "1.0",
  },
  setShootModeAudio: {
    method: "setShootMode",
    params: ["audio"],
    id: 1,
    version: "1.0",
  },
  setShootModeIntervalStill: {
    method: "setShootMode",
    params: ["intervalstill"],
    id: 1,
    version: "1.0",
  },
  setShootModeLoopRec: {
    method: "setShootMode",
    params: ["looprec"],
    id: 1,
    version: "1.0",
  },
  // ==========================================
  /*
  {
 "result": ["still"],
 "id": 1
}
  */
  getShootMode: {
    method: "getShootMode",
    params: [],
    id: 1,
    version: "1.0",
  },
  // ==========================================
  /*
  {
 "result": ["still", "movie"],
 "id": 1
}
  */
  getSupportedShootMode: {
    method: "getSupportedShootMode",
    params: [],
    id: 1,
    version: "1.0",
  },
  // ==========================================
  /*
  {
 "result": ["movie", ["still", "movie"]], // current mode + available modes
 "id": 1
}
  */
  getAvailableShootMode: {
    method: "getAvailableShootMode",
    params: [],
    id: 1,
    version: "1.0",
  },
  // ========================================== Read api page 28
  /*
  {
 "result": [["http://ip:port/postview/postview.jpg"]],
 "id": 1
}
  */
  actTakePicture: {
    method: "actTakePicture",
    params: [],
    id: 1,
    version: "1.0",
  },
  // ==========================================
  /*
  {
 "result": [["http://ip:port/postview/postview.jpg"]],
 "id": 1
}
  */
  awaitTakePicture: {
    method: "awaitTakePicture",
    params: [],
    id: 1,
    version: "1.0",
  },
  // ========================================== see special note page 30
  /*
  {
 "result": [],
 "id": 1
}
  */
  startContShooting: {
    method: "startContShooting",
    params: [],
    id: 1,
    version: "1.0",
  },
  // ==========================================
  /*
  {
 "result": [],
 "id": 1
}
  */
  stopContShooting: {
    method: "stopContShooting",
    params: [],
    id: 1,
    version: "1.0",
  },
  // ==========================================
  /*
  {
 "result": [0],
 "id": 1
}
  */
  startMovieRec: {
    method: "startMovieRec",
    params: [],
    id: 1,
    version: "1.0",
  },
  // ==========================================
  /*
  {
 "result": "",
 "id": 1
}
  */
  stopMovieRec: {
    method: "stopMovieRec",
    params: [],
    id: 1,
    version: "1.0",
  },
  // ==========================================
  /*
  {
 "result": [0],
 "id": 1
}
  */
  startAudioRec: {
    method: "startAudioRec",
    params: [],
    id: 1,
    version: "1.0",
  },
  // ==========================================
  /*
  {
 "result": [0],
 "id": 1
}
  */
  stopAudioRec: {
    method: "stopAudioRec",
    params: [],
    id: 1,
    version: "1.0",
  },
  // ==========================================
  /*
  {
 "result": [0],
 "id": 1
}
  */
  startIntervalRec: {
    method: "startIntervalRec",
    params: [],
    id: 1,
    version: "1.0",
  },
  // ==========================================
  /*
  {
 "result": [0],
 "id": 1
}
  */
  stopIntervalRec: {
    method: "stopIntervalRec",
    params: [],
    id: 1,
    version: "1.0",
  },
  // ==========================================
  /*
  {
 "result": [],
 "id": 1
}
  */
  startIntervalRec: {
    method: "startLoopRec",
    params: [],
    id: 1,
    version: "1.0",
  },
  // ==========================================
  /*
  {
 "result": [],
 "id": 1
}
  */
  startIntervalRec: {
    method: "stopLoopRec",
    params: [],
    id: 1,
    version: "1.0",
  },
  // ==========================================
  /*
  {
 "result": ["http://ip:port/liveview/liveviewstream"],
 "id": 1
}
  */
  startLiveview: {
    method: "startLiveview",
    params: [],
    id: 1,
    version: "1.0",
  },
  // ==========================================
  /*
  {
 "result": [0],
 "id": 1
}
  */
  stopLiveview: {
    method: "stopLiveview",
    params: [],
    id: 1,
    version: "1.0",
  },
  // ==========================================
  /*
  {
 "result": ["http://ip:port/liveview/liveviewstream"],
 "id": 1
}
  */
  startLiveviewWithSizeMedium: {
    method: "startLiveviewWithSize",
    params: ["M"],
    id: 1,
    version: "1.0",
  },
  startLiveviewWithSizeLarge: {
    method: "startLiveviewWithSize",
    params: ["L"],
    id: 1,
    version: "1.0",
  },

  // ==========================================
  /*
  {
 "result": ["M"],
 "id": 1
}
  */
  getLiveviewSize: {
    method: "getLiveviewSize",
    params: [],
    id: 1,
    version: "1.0",
  },
  // ==========================================
  /*
  {
 "result": ["L", "M"],
 "id": 1
}
  */
  getSupportedLiveviewSizes: {
    method: "getSupportedLiveviewSize",
    params: [],
    id: 1,
    version: "1.0",
  },
  // ==========================================
  /*
  {
 "result": ["M",["L", "M"]],
 "id": 1
}
  */
  getAvailableLiveviewSize: {
    method: "getAvailableLiveviewSize",
    params: [],
    id: 1,
    version: "1.0",
  },
  // ==========================================
  /*
  {
 "result": [],
 "id": 1
}
  */
  enableLiveviewFrameInfo: {
    method: "setLiveviewFrameInfo",
    params: [
      {
        frameInfo: true,
      },
    ],
    id: 1,
    version: "1.0",
  },
  // ==========================================
  /*
  {
 "result": [],
 "id": 1
}
  */
  disableLiveviewFrameInfo: {
    method: "setLiveviewFrameInfo",
    params: [
      {
        frameInfo: false,
      },
    ],
    id: 1,
    version: "1.0",
  },
  // ==========================================
  /*
  {
 "result": [{
     "frameInfo": true
 }],
 "id": 1
}
  */
  getLiveviewFrameInfo: {
    method: "getLiveviewFrameInfo",
    params: [],
    id: 1,
    version: "1.0",
  },
  // ==========================================
  /*
  {
 "result": [0],
 "id": 1
}
  */
  actZoomStartIn: {
    method: "actZoom",
    params: ["in", "start"], // in, out, and start, stop, 1shot(short push)
    id: 1,
    version: "1.0",
  },
  actZoomStartOut: {
    method: "actZoom",
    params: ["out", "start"], // in, out, and start, stop, 1shot(short push)
    id: 1,
    version: "1.0",
  },
  actZoomStopIn: {
    method: "actZoom",
    params: ["in", "stop"], // in, out, and start, stop, 1shot(short push)
    id: 1,
    version: "1.0",
  },
  actZoomStopOut: {
    method: "actZoom",
    params: ["out", "stop"], // in, out, and start, stop, 1shot(short push)
    id: 1,
    version: "1.0",
  },
  actZoomPushIn: {
    method: "actZoom",
    params: ["in", "1shot"], // in, out, and start, stop, 1shot(short push)
    id: 1,
    version: "1.0",
  },
  actZoomPushOut: {
    method: "actZoom",
    params: ["out", "1shot"], // in, out, and start, stop, 1shot(short push)
    id: 1,
    version: "1.0",
  },
  // ==========================================
  /*
  {
 "result": [],
 "id": 1
}
  */
  setZoomSettingOptical: {
    method: "setZoomSetting",
    params: [
      {
        zoom: "Optical Zoom Only",
      },
    ],
    id: 1,
    version: "1.0",
  },
  setZoomSettingSmart: {
    method: "setZoomSetting",
    params: [
      {
        zoom: "Smart Zoom Only",
      },
    ],
    id: 1,
    version: "1.0",
  },
  setZoomSettingClearImageOn: {
    method: "setZoomSetting",
    params: [
      {
        zoom: "On:Clear Image Zoom",
      },
    ],
    id: 1,
    version: "1.0",
  },
  setZoomSettingDigitalOn: {
    method: "setZoomSetting",
    params: [
      {
        zoom: "On:Digital Zoom",
      },
    ],
    id: 1,
    version: "1.0",
  },
  setZoomSettingDigitalOff: {
    method: "setZoomSetting",
    params: [
      {
        zoom: "Off:Digital Zoom",
      },
    ],
    id: 1,
    version: "1.0",
  },
  // ==========================================
  /*
  {
 "result": [{
     "zoom": "Optical Zoom Only"
 }],
 "id": 1
}
  */
  getZoomSetting: {
    method: "getZoomSetting",
    params: [],
    id: 1,
    version: "1.0",
  },
  // ==========================================
  /*
  {
 "result": [{
     "candidate": [
         "Optical Zoom Only",
         "On:Clear Image Zoom"
     ]
 }],
 "id": 1
}
  */
  getSupportedZoomSetting: {
    method: "getSupportedZoomSetting",
    params: [],
    id: 1,
    version: "1.0",
  },
  // ==========================================
  /*
  {
 "result": [{
     "candidate": [
         "Optical Zoom Only",
         "On:Clear Image Zoom"
     ]
 }],
 "id": 1
}
  */
  getAvailableZoomSetting: {
    method: "getAvailableZoomSetting",
    params: [],
    id: 1,
    version: "1.0",
  },
  // ==========================================
  /*
  {
 "result": [],
 "id": 1
}
  */
  actHalfPressShutter: {
    method: "actHalfPressShutter",
    params: [],
    id: 1,
    version: "1.0",
  },
  // ==========================================
  /*
  {
 "result": [],
 "id": 1
}
  */
  cancelHalfPressShutter: {
    method: "cancelHalfPressShutter",
    params: [],
    id: 1,
    version: "1.0",
  },
  // ==========================================
  /*
  {
 "result": [
     0,
     {
         "AFResult": true,
         "AFType": "Touch"
     }
 ],
 "id": 1
}
  */

  setTouchAFPosition: {
    method: "setTouchAFPosition",
    params: [24.5, 45.4],
    // params: [sony.touchAFPos.x, sony.touchAFPos.y], // origins top left of screen
    id: 1,
    version: "1.0",
  },
  // ==========================================
  /*
  {
 "result": [
     { "set": true, "touchCoordinates": []}
 ],
 "id": 1
}
  */
  getTouchAFPosition: {
    method: "getTouchAFPosition",
    params: [],
    id: 1,
    version: "1.0",
  },
  // ==========================================
  /*
  {
 "result": [],
 "id": 1
}
  */
  cancelTouchAFPosition: {
    method: "cancelTouchAFPosition",
    params: [],
    id: 1,
    version: "1.0",
  },
  // ==========================================
  /*
  {
 "result": [],
 "id": 1
}
  */
  actTrackingFocus: {
    method: "actTrackingFocus",
    params: [
      {
        xPosition: sony.trackingFocusPos.x,
        yPosition: sony.trackingFocusPos.y,
      },
    ],
    id: 1,
    version: "1.0",
  },
  // ==========================================
  /*
  {
 "result": [],
 "id": 1
}
  */
  cancelTrackingFocus: {
    method: "cancelTrackingFocus",
    params: [],
    id: 1,
    version: "1.0",
  },
  // ==========================================
  /*
  {
 "result": [],
 "id": 1
}
  */
  setTrackingFocusOn: {
    method: "setTrackingFocus",
    params: [
      {
        trackingFocus: "On",
      },
    ],
    id: 1,
    version: "1.0",
  },
  setTrackingFocusOff: {
    method: "setTrackingFocus",
    params: [
      {
        trackingFocus: "Off",
      },
    ],
    id: 1,
    version: "1.0",
  },
  // ==========================================
  /*
  {
 "result": [{
     "trackingFocus": "On"
 }],
 "id": 1
}
  */
  getTrackingFocus: {
    method: "getTrackingFocus",
    params: [],
    id: 1,
    version: "1.0",
  },
  // ==========================================
  /*
  {
 "result": [{
     "candidate": [
         "On", "Off"
     ]
 }],
 "id": 1
}
  */
  getSupportedTrackingFocus: {
    method: "getSupportedTrackingFocus",
    params: [],
    id: 1,
    version: "1.0",
  },
  // ==========================================
  /*
  {
 "result": [{
     "trackingFocus": "On"
     "candidate": [
         "On", "Off"
     ]
 }],
 "id": 1
}
  */
  getAvailableTrackingFocus: {
    method: "getAvailableTrackingFocus",
    params: [],
    id: 1,
    version: "1.0",
  },
  // ==========================================
  /*
  {
 "result": [],
 "id": 1
}
  */
  setContShootingModeSpdPriority: {
    method: "setContShootingMode",
    params: [
      {
        contShootingmode: "Spd Priority Cont.",
      },
    ],
    id: 1,
    version: "1.0",
  },
  setContShootingModeSingle: {
    method: "setContShootingMode",
    params: [
      {
        contShootingmode: "Single",
      },
    ],
    id: 1,
    version: "1.0",
  },
  setContShootingModeContinuous: {
    method: "setContShootingMode",
    params: [
      {
        contShootingmode: "Continuous",
      },
    ],
    id: 1,
    version: "1.0",
  },
  setContShootingModeBurst: {
    method: "setContShootingMode",
    params: [
      {
        contShootingmode: "Burst",
      },
    ],
    id: 1,
    version: "1.0",
  },
  setContShootingModeMotionShot: {
    method: "setContShootingMode",
    params: [
      {
        contShootingmode: "MotionShot",
      },
    ],
    id: 1,
    version: "1.0",
  },
  // ==========================================
  /*
  {
 "result": [
     {
         "contShootingMode": "Spd Priority Cont."
     }
 ],
 "id": 1
}
  */
  getContShootingMode: {
    method: "getContShootingMode",
    params: [],
    id: 1,
    version: "1.0",
  },
  // ==========================================
  /*
  {
 "result": [
     {
         "candidate": [
             "Single",
             "Continuous",
             "Spd Priority Cont."
         ]
     }
 ],
 "id": 1
}
  */
  getSupportedContShootingMode: {
    method: "getSupportedContShootingMode",
    params: [],
    id: 1,
    version: "1.0",
  },
  // ==========================================
  /*
  {
 "result": [
     {
         "contShootingMode": "Spd Priority Cont.",
         "candidate": [
             "Single",
             "Continuous",
             "Spd Priority Cont."
         ]
     }
 ],
 "id": 1
}
  */
  getAvailableContShootingMode: {
    method: "getAvailableContShootingMode",
    params: [],
    id: 1,
    version: "1.0",
  },
  // ==========================================
  /*
  {
 "result": [],
 "id": 1
}
  */
  setContShootingSpeedHi: {
    method: "setContShootingSpeed",
    params: [
      {
        contShootingSpeed: "Hi",
      },
    ],
    id: 1,
    version: "1.0",
  },
  setContShootingSpeedLow: {
    method: "setContShootingSpeed",
    params: [
      {
        contShootingSpeed: "Low",
      },
    ],
    id: 1,
    version: "1.0",
  },
  setContShootingSpeed10FPS1Sec: {
    method: "setContShootingSpeed",
    params: [
      {
        contShootingSpeed: "10fps 1sec",
      },
    ],
    id: 1,
    version: "1.0",
  },
  setContShootingSpeed8FPS1Sec: {
    method: "setContShootingSpeed",
    params: [
      {
        contShootingSpeed: "8fps 1sec",
      },
    ],
    id: 1,
    version: "1.0",
  },
  setContShootingSpeed5FPS2Sec: {
    method: "setContShootingSpeed",
    params: [
      {
        contShootingSpeed: "5fps 2sec",
      },
    ],
    id: 1,
    version: "1.0",
  },
  setContShootingSpeed2FPS5Sec: {
    method: "setContShootingSpeed",
    params: [
      {
        contShootingSpeed: "2fps 5sec",
      },
    ],
    id: 1,
    version: "1.0",
  },
  // ==========================================
  /*
  {
 "result": [
     {
         "contShootingSpeed": "Hi"
     }
 ],
 "id": 1
}
  */
  getContShootingSpeed: {
    method: "getContShootingSpeed",
    params: [],
    id: 1,
    version: "1.0",
  },
  // ==========================================
  /*
  {
 "result": [
     {
         "contShootingSpeed": [
             "Hi",
             "Low"
         ]
     }
 ],
 "id": 1
}
  */
  getSupportedContShootingSpeed: {
    method: "getSupportedContShootingSpeed",
    params: [],
    id: 1,
    version: "1.0",
  },
  // ==========================================
  /*
  {
 "result": [
     {
         "contShootingSpeed": "Hi",
         "contShootingSpeed": [
             "Hi",
             "Low"
         ]
     }
 ],
 "id": 1
}
  */
  getAvailableContShootingSpeed: {
    method: "getAvailableContShootingSpeed",
    params: [],
    id: 1,
    version: "1.0",
  },
  // ==========================================
  /*
  {
 "result": [0],
 "id": 1
}
  */
  setSelfTimer: {
    method: "setSelfTimer",
    params: [sony.selfTimerSeconds],
    id: 1,
    version: "1.0",
  },
  // ==========================================
  /*
  {
 "result": [2],
 "id": 1
}
  */
  getSelfTimer: {
    method: "getSelfTimer",
    params: [],
    id: 1,
    version: "1.0",
  },
  // ==========================================
  /*
  {
 "result": [0, 2, 10],
 "id": 1
}
  */
  getSupportedSelfTimer: {
    method: "getSupportedSelfTimer",
    params: [],
    id: 1,
    version: "1.0",
  },
  // ==========================================
  /*
  {
 "result": [0,[0, 2, 10]],
 "id": 1
}
  */
  getAvailableSelfTimer: {
    method: "getAvailableSelfTimer",
    params: [],
    id: 1,
    version: "1.0",
  },
  // ==========================================
  /*
  {
 "result": [0],
 "id": 1
}
  */
  setExposureModeIntelligentAuto: {
    method: "setExposureMode",
    params: ["Intelligent Auto"],
    id: 1,
    version: "1.0",
  },
  // ==========================================
  /*
  {
 "result": [0],
 "id": 1
}
  */
  setExposureModeSuperiorAuto: {
    method: "setExposureMode",
    params: ["Superior Auto"],
    id: 1,
    version: "1.0",
  },
  // ==========================================
  /*
  {
 "result": [0],
 "id": 1
}
  */
  setExposureModeManual: {
    method: "setExposureMode",
    params: ["Manual"],
    id: 1,
    version: "1.0",
  },
  // ==========================================
  /*
  {
 "result": [0],
 "id": 1
}
  */
  setExposureModeShutter: {
    method: "setExposureMode",
    params: ["Shutter"],
    id: 1,
    version: "1.0",
  },
  // ==========================================
  /*
  {
 "result": [0],
 "id": 1
}
  */
  setExposureModeAperture: {
    method: "setExposureMode",
    params: ["Aperture"],
    id: 1,
    version: "1.0",
  },
  // ==========================================
  /*
  {
 "result": [0],
 "id": 1
}
  */
  setExposureModeProgramAuto: {
    method: "setExposureMode",
    params: ["Program Auto"],
    id: 1,
    version: "1.0",
  },
  // ==========================================
  /*
  {
 "result": ["Intelligent Auto"],
 "id": 1
}
  */
  getExposureMode: {
    method: "getExposureMode",
    params: [],
    id: 1,
    version: "1.0",
  },
  // ==========================================
  /*
  {
 "result": ["Intelligent Auto", "Superior Auto"],
 "id": 1
}
  */
  getSupportedExposureMode: {
    method: "getSupportedExposureMode",
    params: [],
    id: 1,
    version: "1.0",
  },
  // ==========================================
  /*
  {
 "result": ["Intelligent Auto", ["Intelligent Auto", "Superior Auto"]],
 "id": 1
}
  */
  getAvailableExposureMode: {
    method: "getAvailableExposureMode",
    params: [],
    id: 1,
    version: "1.0",
  },
  // ==========================================
  /*
  {
 "result": [0],
 "id": 1
}
  */
  setFocusModeManual: {
    method: "setFocusMode",
    params: ["MF"],
    id: 1,
    version: "1.0",
  },
  // ==========================================
  /*
  {
 "result": [0],
 "id": 1
}
  */
  setFocusModeDirectManualFocus: {
    method: "setFocusMode",
    params: ["DMF"],
    id: 1,
    version: "1.0",
  },
  // ==========================================
  /*
  {
 "result": [0],
 "id": 1
}
  */
  setFocusModeContinuous: {
    method: "setFocusMode",
    params: ["AF-C"],
    id: 1,
    version: "1.0",
  },
  // ==========================================
  /*
  {
 "result": [0],
 "id": 1
}
  */
  setFocusModeSingleAF: {
    method: "setFocusMode",
    params: ["AF-S"],
    id: 1,
    version: "1.0",
  },
  // ==========================================
  /*
  {
 "result": ["MF"],
 "id": 1
}
  */
  getFocusMode: {
    method: "getFocusMode",
    params: [],
    id: 1,
    version: "1.0",
  },
  // ==========================================
  /*
  {
 "result": ["MF", "AF-S"],
 "id": 1
}
  */
  getSupportedFocusMode: {
    method: "getSupportedFocusMode",
    params: [],
    id: 1,
    version: "1.0",
  },
  // ==========================================
  /*
  {
 "result": ["MF",["MF", "AF-S"]],
 "id": 1
}
  */
  getAvailableFocusMode: {
    method: "getAvailableFocusMode",
    params: [],
    id: 1,
    version: "1.0",
  },
  // ==========================================
  /*
  {
 "result": [0],
 "id": 1
}
  */
  setExposureCompensation: {
    method: "setExposureCompensation",
    params: [sony.exposureCompensation], // -6 to 6
    id: 1,
    version: "1.0",
  },
  // ==========================================
  /*
  {
 "result": [2],
 "id": 1
}
  */
  getExposureCompensation: {
    method: "getExposureCompensation",
    params: [],
    id: 1,
    version: "1.0",
  },
  // ==========================================
  /*
  {
 "result": [
     [6,6],
     [-6,-6],
     [1,2]
 ],
 "id": 1
}
  */
  getSupportedExposureCompensation: {
    method: "getSupportedExposureCompensation",
    params: [],
    id: 1,
    version: "1.0",
  },
  // ==========================================
  /*
  by position:
  first is current ev
  next is upper limit
  then lower limit 
  finally step value
  {
 "result": [
     0,6,-6,1
 ],
 "id": 1
}
  */
  getAvailableExposureCompensation: {
    method: "getAvailableExposureCompensation",
    params: [],
    id: 1,
    version: "1.0",
  },

  // ==========================================
  /*
  {
 "result": [0],
 "id": 1
}
  */
  setFNumber: {
    method: "setFNumber",
    params: [String(sony.fStop)],
    id: 1,
    version: "1.0",
  },
  // ==========================================
  /*
  {
 "result": ["5.6"],
 "id": 1
}
  */
  getFNumber: {
    method: "getFNumber",
    params: [],
    id: 1,
    version: "1.0",
  },
  // ==========================================
  /*
  {
 "result": [["1.8","5.6"]],
 "id": 1
}
  */
  getSupportedFNumber: {
    method: "getSupportedFNumber",
    params: [],
    id: 1,
    version: "1.0",
  },
  // ==========================================
  /*
  {
 "result": ["1.8",["1.8","5.6"]],
 "id": 1
}
  */
  getAvailableFNumber: {
    method: "getAvailableFNumber",
    params: [],
    id: 1,
    version: "1.0",
  },
  // ==========================================
  /*
  {
 "result": [0],
 "id": 1
}
  */
  setShutterSpeed: {
    method: "setShutterSpeed",
    params: [sony.shutterSpeed], // string
    id: 1,
    version: "1.0",
  },
  // ==========================================
  /*
  {
 "result": ["1/2"],
 "id": 1
}
  */
  getShutterSpeed: {
    method: "getShutterSpeed",
    params: [],
    id: 1,
    version: "1.0",
  },
  // ==========================================
  /*
  {
 "result": [
     ["30\"","1\"","1/2","1/30","1/250"]
 ],
 "id": 1
}
  */
  getSupportedShutterSpeed: {
    method: "getSupportedShutterSpeed",
    params: [],
    id: 1,
    version: "1.0",
  },
  // ==========================================
  /*
  {
 "result": [
     "1/250", ["30\"","1\"","1/2","1/30","1/250"]
 ],
 "id": 1
}
  */
  getAvailableShutterSpeed: {
    method: "getAvailableShutterSpeed",
    params: [],
    id: 1,
    version: "1.0",
  },
  // ==========================================
  /*
  {
 "result": [
     0
 ],
 "id": 1
}
  */
  setIsoSpeedRate: {
    method: "setIsoSpeedRate",
    params: [String(sony.iso)],
    id: 1,
    version: "1.0",
  },
  // ==========================================
  /*
  {
 "result": [
     "400"
 ],
 "id": 1
}
  */
  getIsoSpeedRate: {
    method: "getIsoSpeedRate",
    params: [],
    id: 1,
    version: "1.0",
  },
  // ==========================================
  /*
  {
 "result": [
     ["400", "800"]
 ],
 "id": 1
}
  */
  getSupportedIsoSpeedRate: {
    method: "getSupportedIsoSpeedRate",
    params: [],
    id: 1,
    version: "1.0",
  },
  // ==========================================
  /*
  {
 "result": [
     "400", ["400", "800"]
 ],
 "id": 1
}
  */
  getAvailableIsoSpeedRate: {
    method: "getAvailableIsoSpeedRate",
    params: [],
    id: 1,
    version: "1.0",
  },

  // ==========================================
  /*
  {
 "result": [
     0
 ],
 "id": 1
}
  */
  setWhiteBalance: {
    method: "setWhiteBalance",
    params: [
      sony.whiteBalance.param,
      sony.whiteBalance.enabled,
      sony.whiteBalance.value,
    ],
    id: 1,
    version: "1.0",
  },
  // ==========================================
  /*
  {
 "result": [
     ["whiteBalanceMode":"Color Temperature", "colorTemperature": 2500]
 ],
 "id": 1
}
  */
  getWhiteBalance: {
    method: "getWhiteBalance",
    params: [],
    id: 1,
    version: "1.0",
  },
  // ==========================================
  /*
  {
 "result": [
     {"whiteBalanceMode":"Auto WB", "colorTemperatureRange":[]},
 {"whiteBalanceMode":"Daylight", "colorTemperatureRange":[]},
 {"whiteBalanceMode":"Color Temperature", "colorTemperatureRange":[9900, 2500, 100] }
 ],
 "id": 1
}
  */
  getSupportedWhiteBalance: {
    method: "getSupportedWhiteBalance",
    params: [],
    id: 1,
    version: "1.0",
  },
  // ==========================================
  /*
  {
 "result": [
     {"whiteBalanceMode":"Auto WB", "colorTemperatureRange":[]},
     [{"whiteBalanceMode":"Auto WB", "colorTemperatureRange":[]},
 {"whiteBalanceMode":"Daylight", "colorTemperatureRange":[]},
 {"whiteBalanceMode":"Color Temperature", "colorTemperatureRange":[9900, 2500, 100] }
 ]],
 "id": 1
}
  */
  getAvailableWhiteBalance: {
    method: "getAvailableWhiteBalance",
    params: [],
    id: 1,
    version: "1.0",
  },
  // ==========================================
  /*
  {
 "result": [
     {
         "colorCompensation": 2,
         "lightBalance": 0,
         "inRange": true,
         "colorTemperature": 7500
     }
     ],
 "id": 1
}
  */
  actWhiteBalanceOnePushCustom: {
    method: "actWhiteBalanceOnePushCustom",
    params: [],
    id: 1,
    version: "1.0",
  },
  // ==========================================
  /*
  {
 "result": [
     0
     ],
 "id": 1
}
  */
  setProgramShift: {
    method: "setProgramShift",
    params: [1],
    id: 1,
    version: "1.0",
  },
  // ==========================================
  /*
  {
 "result": [
     [5,-5]
     ],
 "id": 1
}
  */
  getSupportedProgramShift: {
    method: "getSupportedProgramShift",
    params: [],
    id: 1,
    version: "1.0",
  },
  // ==========================================
  /*
  {
 "result": [
     0
     ],
 "id": 1
}
  */
  setFlashModeOn: {
    method: "setFlashMode",
    params: ["On"],
    id: 1,
    version: "1.0",
  },
  // ==========================================
  /*
  {
 "result": [
     0
     ],
 "id": 1
}
  */
  setFlashModeOff: {
    method: "setFlashMode",
    params: ["off"],
    id: 1,
    version: "1.0",
  },
  // ==========================================
  /*
  {
 "result": [
     "off"
     ],
 "id": 1
}
  */
  getFlashModeOff: {
    method: "getFlashMode",
    params: [],
    id: 1,
    version: "1.0",
  },
  // ==========================================
  /*
  {
 "result": [
     ["off", "on"]
     ],
 "id": 1
}
  */
  getSupportedFlashModeOff: {
    method: "getSupportedFlashMode",
    params: [],
    id: 1,
    version: "1.0",
  },
  // ==========================================
  /*
  {
 "result": [
     "off",
     ["off", "on"]
     ],
 "id": 1
}
  */
  getAvailableFlashModeOff: {
    method: "getAvailableFlashMode",
    params: [],
    id: 1,
    version: "1.0",
  },
  // ==========================================
  /*
  {
 "result": [
     0
     ],
 "id": 1
}
  */
  setStillSize: {
    method: "setStillSize",
    params: [sony.stills.aspectRatio, sony.stills.size],
    id: 1,
    version: "1.0",
  },
  // ==========================================
  /*
  {
 "result": [
     ["aspect": "4:3", "size":"5M"]
     ],
 "id": 1
}
  */
  getStillSize: {
    method: "getStillSize",
    params: [],
    id: 1,
    version: "1.0",
  },
  // ==========================================
  /*
  {
 "result": [
   [  
 { "aspect":"16:9", "size":"17M" },
 { "aspect":"16:9", "size":"7.5M"},
 { "aspect":"4:3", "size":"18M" }
 ]
     ],
 "id": 1
}
  */
  getSupportedStillSize: {
    method: "getSupportedStillSize",
    params: [],
    id: 1,
    version: "1.0",
  },
  // ==========================================
  /*
  {
 "result": [
     { "aspect":"4:3", "size":"5M"},,
     [
 { "aspect":"16:9", "size":"17M" },
 { "aspect":"16:9", "size":"7.5M"},
 { "aspect":"4:3", "size":"18M" }
 ]
     ],
 "id": 1
}
  */
  getAvailableStillSize: {
    method: "getAvailableStillSize",
    params: [],
    id: 1,
    version: "1.0",
  },
  // ========================================== page 132
  /*
  {
 "result": [],
 "id": 1
}
  */
  setStillQuality: {
    method: "setStillQuality",
    params: [{ stillQuality: sony.stills.quality }],
    id: 1,
    version: "1.0",
  },
  // ========================================== page 132
  /*
  {
 "result": [
     {
         "stillQuality":"RAW+JPEG"
     }
 ],
 "id": 1
}
  */
  getStillQuality: {
    method: "getStillQuality",
    params: [],
    id: 1,
    version: "1.0",
  },
  // ========================================== page 132
  /*
  {
 "result": [
     {
         "candidate": [
             "RAW+JPEG",
             "Fine",
             "Standard"
         ]
     }
 ],
 "id": 1
}
  */
  getSupportedStillQuality: {
    method: "getSupportedStillQuality",
    params: [],
    id: 1,
    version: "1.0",
  },
  // ========================================== page 132
  /*
  {
 "result": [
     {
         "stillQuality": "Fine",
         "candidate": [
             "RAW+JPEG",
             "Fine",
             "Standard"
         ]
     }
 ],
 "id": 1
}
  */
  getAvailableStillQuality: {
    method: "getAvailableStillQuality",
    params: [],
    id: 1,
    version: "1.0",
  },
  // ==========================================
  /*
  {
 "result": [0],
 "id": 1
}
  */
  setPostviewImageSize: {
    method: "setPostviewImageSize",
    params: [sony.postviewImageSize],
    id: 1,
    version: "1.0",
  },
  // ==========================================
  /*
  {
 "result": [
     "Original"
 ],
 "id": 1
}
  */
  getPostviewImageSize: {
    method: "getPostviewImageSize",
    params: [],
    id: 1,
    version: "1.0",
  },
  // ==========================================
  /*
  {
 "result": [
     ["Original", "2M"]
 ],
 "id": 1
}
  */
  getSupportedPostviewImageSize: {
    method: "getSupportedPostviewImageSize",
    params: [],
    id: 1,
    version: "1.0",
  },
  // ==========================================
  /*
  {
 "result": [
     "Original",
     ["Original", "2M"]
 ],
 "id": 1
}
  */
  getAvailablePostviewImageSize: {
    method: "getAvailablePostviewImageSize",
    params: [],
    id: 1,
    version: "1.0",
  },
  // ==========================================
  /*
  {
 "result": [],
 "id": 1
}
  */
  setMovieFileFormat: {
    method: "setMovieFileFormat",
    params: [sony.movie.fileFormat],
    id: 1,
    version: "1.0",
  },
  // ==========================================
  /*
  {
 "result": [
     {
         "movieFileFormat": "XAVC S"
     }
 ],
 "id": 1
}
  */
  getMovieFileFormat: {
    method: "getMovieFileFormat",
    params: [],
    id: 1,
    version: "1.0",
  },
  // ==========================================
  /*
  {
 "result": [
     {
         "candidate": [
             "MP4",
             "XAVC S"
         ]
     }
 ],
 "id": 1
}
  */
  getSupportedMovieFileFormat: {
    method: "getSupportedMovieFileFormat",
    params: [],
    id: 1,
    version: "1.0",
  },
  // ==========================================
  /*
  {
 "result": [
     {
         "candidate": [
             "MP4",
             "XAVC S"
         ],
         "movieFileFormat": "XAVC S"
     }
 ],
 "id": 1
}
  */
  getAvailableMovieFileFormat: {
    method: "getAvailableMovieFileFormat",
    params: [],
    id: 1,
    version: "1.0",
  },
  // ==========================================
  /*
  {
 "result": [0],
 "id": 1
}
  */
  setMovieQuality: {
    method: "setMovieQuality",
    params: [sony.movie.quality],
    id: 1,
    version: "1.0",
  },
  // ==========================================
  /*
  {
 "result": [
     "HQ"
 ],
 "id": 1
}
  */
  getMovieQuality: {
    method: "getMovieQuality",
    params: [],
    id: 1,
    version: "1.0",
  },
  // ==========================================
  /*
  {
 "result": [
     ["HQ", "STD"...]
 ],
 "id": 1
}
  */
  getSupportedMovieQuality: {
    method: "getSupportedMovieQuality",
    params: [],
    id: 1,
    version: "1.0",
  },
  // ==========================================
  /*
  {
 "result": [
     "HQ",
     ["HQ", "STD"...]
 ],
 "id": 1
}
  */
  getAvailableMovieQuality: {
    method: "getAvailableMovieQuality",
    params: [],
    id: 1,
    version: "1.0",
  },
  // ==========================================
  /*
  {
 "result": [0],
 "id": 1
}
  */
  setSteadyModeOn: {
    method: "setSteadyMode",
    params: ["on"],
    id: 1,
    version: "1.0",
  },
  setSteadyModeOff: {
    method: "setSteadyMode",
    params: ["off"],
    id: 1,
    version: "1.0",
  },
  // ==========================================
  /*
  {
 "result": ["off"],
 "id": 1
}
  */
  getSteadyModeOn: {
    method: "getSteadyMode",
    params: [],
    id: 1,
    version: "1.0",
  },
  // ==========================================
  /*
  {
 "result": ["off", "on"],
 "id": 1
}
  */
  getSupportedSteadyModeOn: {
    method: "getSupportedSteadyMode",
    params: [],
    id: 1,
    version: "1.0",
  },
  // ==========================================
  /*
  {
 "result": ["off", ["off", "on"]],
 "id": 1
}
  */
  getAvailableSteadyModeOn: {
    method: "getAvailableSteadyMode",
    params: [],
    id: 1,
    version: "1.0",
  },
  // ==========================================
  /*
  {
 "result": [0],
 "id": 1
}
  */
  setViewAngle: {
    method: "setViewAngle",
    params: [sony.viewAngle],
    id: 1,
    version: "1.0",
  },
  // ==========================================
  /*
  {
 "result": [120],
 "id": 1
}
  */
  getViewAngle: {
    method: "getViewAngle",
    params: [],
    id: 1,
    version: "1.0",
  },
  // ==========================================
  /*
  {
 "result": [[
     120,170
 ]],
 "id": 1
}
  */
  getSupportedViewAngle: {
    method: "getSupportedViewAngle",
    params: [],
    id: 1,
    version: "1.0",
  },
  // ==========================================
  /*
  {
 "result": [120, [
     120,170
 ]],
 "id": 1
}
  */
  getAvailableViewAngle: {
    method: "getAvailableViewAngle",
    params: [],
    id: 1,
    version: "1.0",
  },
  // ==========================================
  /*
  {
 "result": [],
 "id": 1
}
  */
  setSceneSelection: {
    method: "setSceneSelection",
    params: [
      {
        scene: sony.scene,
      },
    ],
    id: 1,
    version: "1.0",
  },
  // ==========================================
  /*
  {
 "result": [
     {
         "scene": "Normal"
     }
 ],
 "id": 1
}
  */
  getSceneSelection: {
    method: "getSceneSelection",
    params: [],
    id: 1,
    version: "1.0",
  },
  // ==========================================
  /*
  {
 "result": [
     {
         "candidate": [
             "Normal",
             "Under Water"
         ]
     }
 ],
 "id": 1
}
  */
  getSupportedSceneSelection: {
    method: "getSupportedSceneSelection",
    params: [],
    id: 1,
    version: "1.0",
  },
  // ==========================================
  /*
  {
 "result": [
     {
         "scene": "Under Water",
         "candidate": [
             "Normal",
             "Under Water"
         ]
     }
 ],
 "id": 1
}
  */
  getAvailableSceneSelection: {
    method: "getAvailableSceneSelection",
    params: [],
    id: 1,
    version: "1.0",
  },

  // ==========================================
  /*
  {
 "result": [],
 "id": 1
}
  */
  setColorSetting: {
    method: "setColorSetting",
    params: [
      {
        colorSetting: sony.colorSetting,
      },
    ],
    id: 1,
    version: "1.0",
  },
  // ==========================================
  /*
  {
 "result": [
     {
         "colorSetting": "Vivid"
     }
 ],
 "id": 1
}
  */
  getColorSetting: {
    method: "getColorSetting",
    params: [],
    id: 1,
    version: "1.0",
  },
  // ==========================================
  /*
  {
 "result": [
     {
         "candidate": [
             "Neutral",
             "Vivid"
         ]
     }
 ],
 "id": 1
}
  */
  getSupportedColorSetting: {
    method: "getSupportedColorSetting",
    params: [],
    id: 1,
    version: "1.0",
  },
  // ==========================================
  /*
  {
 "result": [
     {
         "colorSetting": "Vivid",
         "candidate": [
             "Neutral",
             "Vivid"
         ]
     }
 ],
 "id": 1
}
  */
  getAvailableColorSetting: {
    method: "getAvailableColorSetting",
    params: [],
    id: 1,
    version: "1.0",
  },
  // ==========================================
  /*
  {
 "result": [],
 "id": 1
}
  */
  setIntervalTime: {
    method: "setIntervalTime",
    params: [
      {
        scene: String(sony.intervalTimeSec),
      },
    ],
    id: 1,
    version: "1.0",
  },
  // ==========================================
  /*
  {
 "result": [
     {
         "getIntervalTimeSec": "10"
     }
 ],
 "id": 1
}
  */
  getIntervalTime: {
    method: "getIntervalTime",
    params: [],
    id: 1,
    version: "1.0",
  },
  // ==========================================
  /*
  {
 "result": [
     {
         "candidate": [
             "1",
             "2",
             ...
         ]
     }
 ],
 "id": 1
}
  */
  getSupportedIntervalTime: {
    method: "getSupportedIntervalTime",
    params: [],
    id: 1,
    version: "1.0",
  },
  // ==========================================
  /*
  {
 "result": [
     {
         "intervalTimeSec": "10",
         "candidate": [
             "1",
             "5",
             ...
         ]
     }
 ],
 "id": 1
}
  */
  getAvailableIntervalTime: {
    method: "getAvailableIntervalTime",
    params: [],
    id: 1,
    version: "1.0",
  },
  // ==========================================
  /*
  {
 "result": [],
 "id": 1
}
  */
  setLoopRecTime: {
    method: "setLoopRecTime",
    params: [
      {
        loopRecTimeMin: String(sony.loopRecTimeMin),
      },
    ],
    id: 1,
    version: "1.0",
  },
  // ==========================================
  /*
  {
 "result": [
     {
         "getLoopRecTime": "10"
     }
 ],
 "id": 1
}
  */
  getLoopRecTime: {
    method: "getLoopRecTime",
    params: [],
    id: 1,
    version: "1.0",
  },
  // ==========================================
  /*
  {
 "result": [
     {
         "candidate": [
             "1",
             "2",
             ...
         ]
     }
 ],
 "id": 1
}
  */
  getSupportedLoopRecTime: {
    method: "getSupportedLoopRecTime",
    params: [],
    id: 1,
    version: "1.0",
  },
  // ==========================================
  /*
  {
 "result": [
     {
         "loopRecTimeMin": "10",
         "candidate": [
             "1",
             "5",
             ...
         ]
     }
 ],
 "id": 1
}
  */
  getAvailableLoopRecTime: {
    method: "getAvailableLoopRecTime",
    params: [],
    id: 1,
    version: "1.0",
  },
  // ==========================================
  /*
  {
 "result": [],
 "id": 1
}
  */
  setWindNoiseReductionOn: {
    method: "setWindNoiseReduction",
    params: [
      {
        windNoiseReduction: "On",
      },
    ],
    id: 1,
    version: "1.0",
  },
  setWindNoiseReductionOff: {
    method: "setWindNoiseReduction",
    params: [
      {
        windNoiseReduction: "Off",
      },
    ],
    id: 1,
    version: "1.0",
  },
  // ==========================================
  /*
  {
 "result": [
     {
         "windNoiseReduction": "On"
     }
 ],
 "id": 1
}
  */
  getWindNoiseReduction: {
    method: "getWindNoiseReduction",
    params: [],
    id: 1,
    version: "1.0",
  },
  // ==========================================
  /*
  {
 "result": [
     {
         "candidate": [
             "on",
             "off"
         ]
     }
 ],
 "id": 1
}
  */
  getSupportedWindNoiseReduction: {
    method: "getSupportedWindNoiseReduction",
    params: [],
    id: 1,
    version: "1.0",
  },
  // ==========================================
  /*
  {
 "result": [
     {
         "windNoiseReduction": "On",
         "candidate": [
             "on",
             "off"
         ]
     }
 ],
 "id": 1
}
  */
  getAvailableWindNoiseReduction: {
    method: "getAvailableWindNoiseReduction",
    params: [],
    id: 1,
    version: "1.0",
  },
  // ==========================================
  /*
  {
 "result": [],
 "id": 1
}
  */
  setAudioRecordingOn: {
    method: "setAudioRecording",
    params: [
      {
        audioRecording: "On",
      },
    ],
    id: 1,
    version: "1.0",
  },
  setAudioRecordingOff: {
    method: "setAudioRecordingOff",
    params: [
      {
        audioRecording: "Off",
      },
    ],
    id: 1,
    version: "1.0",
  },
  // ==========================================
  /*
  {
 "result": [
     {
         "audioRecording": "On"
     }
 ],
 "id": 1
}
  */
  getAudioRecording: {
    method: "getAudioRecording",
    params: [],
    id: 1,
    version: "1.0",
  },
  // ==========================================
  /*
  {
 "result": [
     {
         "candidate": [
             "on",
             "off"
         ]
     }
 ],
 "id": 1
}
  */
  getSupportedAudioRecording: {
    method: "getSupportedAudioRecording",
    params: [],
    id: 1,
    version: "1.0",
  },
  // ==========================================
  /*
  {
 "result": [
     {
         "audioRecording": "On",
         "candidate": [
             "on",
             "off"
         ]
     }
 ],
 "id": 1
}
  */
  getAvailableAudioRecording: {
    method: "getAvailableAudioRecording",
    params: [],
    id: 1,
    version: "1.0",
  },
  // ==========================================
  /*
  {
 "result": [],
 "id": 1
}
  */
  setFlipSettingOn: {
    method: "setFlipSetting",
    params: [
      {
        flip: "On",
      },
    ],
    id: 1,
    version: "1.0",
  },
  setFlipSettingOff: {
    method: "setFlipSetting",
    params: [
      {
        flip: "Off",
      },
    ],
    id: 1,
    version: "1.0",
  },
  // ==========================================
  /*
  {
 "result": [
     {
         "flip": "On"
     }
 ],
 "id": 1
}
  */
  getFlipSetting: {
    method: "getFlipSetting",
    params: [],
    id: 1,
    version: "1.0",
  },
  // ==========================================
  /*
  {
 "result": [
     {
         "candidate": [
             "on",
             "off"
         ]
     }
 ],
 "id": 1
}
  */
  getSupportedFlipSetting: {
    method: "getSupportedFlipSetting",
    params: [],
    id: 1,
    version: "1.0",
  },
  // ==========================================
  /*
  {
 "result": [
     {
         "flip": "On",
         "candidate": [
             "on",
             "off"
         ]
     }
 ],
 "id": 1
}
  */
  getAvailableFlipSetting: {
    method: "getAvailableFlipSetting",
    params: [],
    id: 1,
    version: "1.0",
  },
  // ==========================================
  /*
  {
 "result": [],
 "id": 1
}
  */
  setTvColorSystemNTSC: {
    method: "setTvColorSystem",
    params: [
      {
        tvColorSystem: "NTSC",
      },
    ],
    id: 1,
    version: "1.0",
  },
  setTvColorSystemPAL: {
    method: "setTvColorSystem",
    params: [
      {
        tvColorSystem: "PAL",
      },
    ],
    id: 1,
    version: "1.0",
  },
  // ==========================================
  /*
  {
 "result": [
     {
         "tvColorSystem": "NTSC"
     }
 ],
 "id": 1
}
  */
  getTvColorSystem: {
    method: "getTvColorSystem",
    params: [],
    id: 1,
    version: "1.0",
  },
  // ==========================================
  /*
  {
 "result": [0],
 "id": 1
}
  */
  startRecMode: {
    method: "startRecMode",
    params: [],
    id: 1,
    version: "1.0",
  },
  // ==========================================
  /*
  {
 "result": [0],
 "id": 1
}
  */
  stopRecMode: {
    method: "stopRecMode",
    params: [],
    id: 1,
    version: "1.0",
  },
  // ==========================================
  /*
  {
 "result": [0],
 "id": 1
}
  */
  setCameraFunctionRemoteShooting: {
    method: "setCameraFunction",
    params: ["Remote Shooting"],
    id: 1,
    version: "1.0",
  },
  setCameraFunctionContentsTransfer: {
    method: "setCameraFunction",
    params: ["Contents Transfer"],
    id: 1,
    version: "1.0",
  },
  // ==========================================
  /*
  {
 "result": ["Remote Shooting"],
 "id": 1
}
  */
  getCameraFunction: {
    method: "getCameraFunction",
    params: [],
    id: 1,
    version: "1.0",
  },
  // ==========================================
  /*
  {
 "result": [["Remote Shooting", "Contents Transfer"]],
 "id": 1
}
  */
  getSupportedCameraFunction: {
    method: "getSupportedCameraFunction",
    params: [],
    id: 1,
    version: "1.0",
  },
  // ==========================================
  /*
  {
 "result": ["Remote Shooting", ["Remote Shooting", "Contents Transfer"]],
 "id": 1
}
  */
  getAvailableCameraFunction: {
    method: "getAvailableCameraFunction",
    params: [],
    id: 1,
    version: "1.0",
  },
  // ==========================================
  /*
  {
 "result": [
     [
         {
             "scheme": "storage"
         }
     ]
 ],
 "id": 1
}
  */
  getSchemeList: {
    method: "getSchemeList",
    params: [],
    id: 1,
    version: "1.0",
  },
  // ==========================================
  /*
  {
 "result": [
     [
         {
             "source": "storage:memoryCard1"
         }
     ]
 ],
 "id": 1
}
  */
  getSourceList: {
    method: "getSourceList",
    params: [
      {
        scheme: "storage",
      },
    ],
    id: 1,
    version: "1.0",
  },
  // ========================================== page 197
  // version 1.3 available
  /*
  {
 "result": [
         {
             "count": 7
         }
 ],
 "id": 1
}
  */
  getContentCount: {
    method: "getContentCount",
    params: [
      {
        uri: sony.getContentCountReq.uri,
        target: sony.getContentCountReq.target,
        view: sony.getContentCountReq.view,
        // optional type param
      },
    ],
    id: 1,
    version: "1.2",
  },

  // ========================================== see page 207
  /*
  {
 "result": [
     {
         "playbackUrl": "http://ip:port/streaming/playbackstream"
     }
 ],
 "id": 1
}
  */
  setStreamingContent: {
    method: "setStreamingContent",
    params: [
      {
        remotePlayType: sony.remotePlay.type,
        uri: sony.remotePlay.uri,
      },
    ],
    id: 1,
    version: "1.0",
  },
  // ==========================================
  /*
  {
 "result": [],
 "id": 1
}
  */
  pauseStreaming: {
    method: "pauseStreaming",
    params: [],
    id: 1,
    version: "1.0",
  },
  // ==========================================
  /*
  {
 "result": [],
 "id": 1
}
  */
  seekStreamingPosition: {
    method: "seekStreamingPosition",
    params: [
      {
        positionMsec: sony.seekStreamingPos,
      },
    ],
    id: 1,
    version: "1.0",
  },
  // ==========================================
  /*
  {
 "result": [],
 "id": 1
}
  */
  stopStreaming: {
    method: "stopStreaming",
    params: [],
    id: 1,
    version: "1.0",
  },
  // ========================================== page 212
  /*
  {
 "result": [
     "status": "started",
     "factor": ""
 ],
 "id": 1
}
  */
  requestToNotifyStreamingStatus: {
    method: "requestToNotifyStreamingStatus",
    params: [
      {
        polling: true,
      },
    ],
    id: 1,
    version: "1.0",
  },
  // ==========================================
  /*
  {
 "result": [],
 "id": 1
}
  */
  deleteContent: {
    method: "deleteContent",
    params: [
      {
        uri: [
          "image:content?contentId=XXXXXXXXXX",
          "video:content?contentId=XXXXXXXXXX",
        ],
      },
    ],
    id: 1,
    version: "1.1",
  },
  // ==========================================
  /*
  {
 "result": [],
 "id": 1
}
  */
  setInfraredRemoteControlOn: {
    method: "setInfraredRemoteControl",
    params: [
      {
        infraredRemoteControl: "On",
      },
    ],
    id: 1,
    version: "1.1",
  },
  setInfraredRemoteControlOff: {
    method: "setInfraredRemoteControl",
    params: [
      {
        infraredRemoteControl: "Off",
      },
    ],
    id: 1,
    version: "1.1",
  },
  // ==========================================
  /*
  {
 "result": [
     {
         "infraredRemoteControl": "Off"
     }
 ],
 "id": 1
}
  */
  getInfraredRemoteControl: {
    method: "getInfraredRemoteControl",
    params: [],
    id: 1,
    version: "1.0",
  },
  // ==========================================
  /*
  {
 "result": [
     {
         "candidate": [
             "On",
             "Off"
         ]
     }
 ],
 "id": 1
}
  */
  getSupportedInfraredRemoteControl: {
    method: "getSupportedInfraredRemoteControl",
    params: [],
    id: 1,
    version: "1.0",
  },
  // ==========================================
  /*
  {
 "result": [
     {
         "infraredRemoteControl": "Off",
         "candidate": [
             "On",
             "Off"
         ]
     }
 ],
 "id": 1
}
  */
  getAvailableInfraredRemoteControl: {
    method: "getAvailableInfraredRemoteControl",
    params: [],
    id: 1,
    version: "1.0",
  },
  // ==========================================
  /*
  {
 "result": [],
 "id": 1
}
  */
  setAutoPowerOff: {
    method: "setAutoPowerOff",
    params: [
      {
        autoPowerOff: sony.autoPowerOffSec,
      },
    ],
    id: 1,
    version: "1.0",
  },
  // ==========================================
  /*
  {
 "result": [
     {
         "autoPowerOff": 60
     }
 ],
 "id": 1
}
  */
  getAutoPowerOff: {
    method: "getAutoPowerOff",
    params: [],
    id: 1,
    version: "1.0",
  },
  // ==========================================
  /*
  {
 "result": [
     {
         "candidate": [
             0,
             60
         ]
     }
 ],
 "id": 1
}
  */
  getSupportedAutoPowerOff: {
    method: "getSupportedAutoPowerOff",
    params: [],
    id: 1,
    version: "1.0",
  },
  // ==========================================
  /*
  {
 "result": [
     {
         "autoPowerOff": 60,
         "candidate": [
             0,
             60
         ]
     }
 ],
 "id": 1
}
  */
  getAvailableAutoPowerOff: {
    method: "getAvailableAutoPowerOff",
    params: [],
    id: 1,
    version: "1.0",
  },
  // ==========================================
  /*
  {
 "result": [],
 "id": 1
}
  */
  setBeepModeOn: {
    method: "setBeepMode",
    params: ["On"],
    id: 1,
    version: "1.0",
  },
  setBeepModeOff: {
    method: "setBeepMode",
    params: ["Off"],
    id: 1,
    version: "1.0",
  },
  setBeepModeShutterOnly: {
    method: "setBeepMode",
    params: ["Shutter Only"],
    id: 1,
    version: "1.0",
  },
  // ==========================================
  /*
  {
 "result": ["On"],
 "id": 1
}
  */
  getBeepMode: {
    method: "getBeepMode",
    params: [],
    id: 1,
    version: "1.0",
  },
  // ==========================================
  /*
  {
 "result": [["On", "Off"]],
 "id": 1
}
  */
  getSupportedBeepMode: {
    method: "getSupportedBeepMode",
    params: [],
    id: 1,
    version: "1.0",
  },
  // ==========================================
  /*
  {
 "result": ["On", ["On", "Off"]],
 "id": 1
}
  */
  getAvailableBeepMode: {
    method: "getAvailableBeepMode",
    params: [],
    id: 1,
    version: "1.0",
  },
  // ==========================================
  /*
  {
 "result": [],
 "id": 1
}
  */
  setCurrentTime: {
    method: "setCurrentTime",
    params: [
      {
        dateTime: sony.setTimeReq.dateTime,
        timeZoneOffsetMinute: sony.setTimeReq.timeZoneOffsetMinute,
        dstOffsetMinute: sony.setTimeReq.dstOffsetMinute,
      },
    ],
    id: 1,
    version: "1.0",
  },
  // ==========================================
  /*
  {
 "result": [
     {
        "storageDescription": "",
        "numberOfRecordableImages": 100,
        "recordTarget": true,
        "storageID": "Memory Card 1",
        "recordableTime": -1
    }
 ],
 "id": 1
}
  */
  getStorageInformation: {
    method: "getStorageInformation",
    params: [],
    id: 1,
    version: "1.0",
  },
  // ==========================================
  /*
  {
 "result": [
     // See Page 236
 ],
 "id": 1
}
  */
  getEvent: {
    method: "getEvent",
    params: [false], // long polling
    id: 1,
    version: "1.0",
  },
  // 1.1 adds focusStatus object
  getEvent11: {
    method: "getEvent",
    params: [true], // long polling
    id: 1,
    version: "1.1",
  },
  // 1.2 adds some objects
  getEvent12: {
    method: "getEvent",
    params: [true], // long polling
    id: 1,
    version: "1.2",
  },
  getEvent13: {
    method: "getEvent",
    params: [true], // long polling
    id: 1,
    version: "1.3",
  },
  // ==========================================
  /*
  {
 "result": [
     [
         "startLiveview", "stopLiveview", ...
     ]
 ],
 "id": 1
}
  */
  getAvailableApiList: {
    method: "getAvailableApiList",
    params: [],
    id: 1,
    version: "1.0",
  },
  // ==========================================
  /*
  {
 "result": [
     "Smart Remote Control",
     "2.0.0"
 ],
 "id": 1
}
  */
  getApplicationInfo: {
    method: "getApplicationInfo",
    params: [],
    id: 1,
    version: "1.0",
  },
  // ==========================================
  /*
  {
 "result": [
     [
         "1.0"
     ]
 ],
 "id": 1
}
  */
  getVersions: {
    method: "getVersions",
    params: [],
    id: 1,
    version: "1.0",
  },
  // ==========================================
  /*
  {
 "result": [
     ["getAvailableApiList",[],["string*"],"1.0"],
        ["setShootMode",["string"],["int"],"1.0"],
        ...
 ],
 "id": 1
}
  */
  getMethodTypes: {
    method: "getMethodTypes",
    params: [String(sony.getMethodTypesVersion)],
    id: 1,
    version: "1.0",
  },
};

export default sony;
