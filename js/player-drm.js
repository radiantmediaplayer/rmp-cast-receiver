/**
Copyright (c) 2018 Radiant Media Player | https://www.radiantmediaplayer.com
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at
    http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

/* Radiant Media Player sample code to test the below DRM CAF player */
/*
var bitrates = {
  dash: '//storage.googleapis.com/shaka-demo-assets/angel-one-widevine/dash.mpd'
};
var settings = {
  licenseKey: 'your-license-key',
  bitrates: bitrates,
  width: 640,
  height: 360,
  shakaDrm: {
    servers: {
      'com.widevine.alpha': '//cwip-shaka-proxy.appspot.com/no_auth'
    }
  },
  googleCastReceiverAppId: 'your-caf-app-id'
};
var elementID = 'rmpPlayer';
var rmp = new RadiantMP(elementID);
rmp.init(settings);*/

const context = cast.framework.CastReceiverContext.getInstance();
const playbackConfig = new cast.framework.PlaybackConfig();
// WIDEVINE license url for playback
playbackConfig.licenseUrl = 'https://cwip-shaka-proxy.appspot.com/no_auth';
// example for license requests with withCredentials 
/*playbackConfig.licenseRequestHandler = requestInfo => {
  requestInfo.withCredentials = true;
};*/
playbackConfig.protectionSystem = cast.framework.ContentProtection.WIDEVINE;
context.start({ playbackConfig: playbackConfig });
