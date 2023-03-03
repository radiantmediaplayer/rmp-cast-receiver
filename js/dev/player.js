/**
@license Copyright (c) 2018-2023 Radiant Media Player | https://www.radiantmediaplayer.com
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

const context = cast.framework.CastReceiverContext.getInstance();
const playerManager = context.getPlayerManager();
const options = new cast.framework.CastReceiverOptions();
options.customNamespaces = {};
options.customNamespaces['urn:x-cast:com.radiantmediaplayer.cast'] = cast.framework.system.MessageType.JSON;
options.useShakaForHls = true;

// handle ad breaks
function addBreakToMedia(media, adTagUrl, currentTime) {
  media.breakClips = [{
    id: 'bc1',
    vastAdsRequest: {
      adTagUrl: adTagUrl
    }
  }];
  media.breaks = [{
    id: 'b1',
    breakClipIds: ['bc1'],
    position: currentTime
  }];
}

function addVmapBreakToMedia(media, vmapAdTagUrl) {
  media.vmapAdsRequest = {
    adTagUrl: vmapAdTagUrl
  };
}

// send signal to local player that the current stream has finished
playerManager.addEventListener(
  cast.framework.events.EventType.MEDIA_FINISHED,
  event => {
    if (event && event.endedReason === 'END_OF_STREAM') {
      context.sendCustomMessage('urn:x-cast:com.radiantmediaplayer.cast', undefined, {
        type: 'STATUS',
        message: 'MEDIA_FINISHED'
      });
    }
  }
);

// on LOAD adjust behaviour of CAF receiver
playerManager.setMessageInterceptor(
  cast.framework.messages.MessageType.LOAD,
  request => {
    if (request.media && request.media.customData) {
      // passing credentials/headers for manifest or segment requests (for license request see below)
      // use player setting googleCastHeaders for custom headers
      if (typeof request.media.customData.credentials === 'boolean' || typeof request.media.customData.headers === 'object') {
        playerManager.setMediaPlaybackInfoHandler((loadRequest, playbackConfig) => {
          playbackConfig.manifestRequestHandler = requestInfo => {
            if (typeof request.media.customData.credentials === 'boolean') {
              requestInfo.withCredentials = request.media.customData.credentials;
            }
            if (typeof request.media.customData.headers === 'object') {
              requestInfo.headers = request.media.customData.headers;
            }
          };
          playbackConfig.segmentRequestHandler = requestInfo => {
            if (typeof request.media.customData.credentials === 'boolean') {
              requestInfo.withCredentials = request.media.customData.credentials;
            }
            if (typeof request.media.customData.headers === 'object') {
              requestInfo.headers = request.media.customData.headers;
            }
          };
          return playbackConfig;
        });
      }
      if (request.media.customData.adTagUrl) {
        if (request.media.customData.currentTime) {
          // VOD and currentTime is not 0
          addBreakToMedia(request.media, request.media.customData.adTagUrl, Math.floor(request.media.customData.currentTime / 1000));
        } else {
          // Live or DVR or VOD with currentTime === 0
          addBreakToMedia(request.media, request.media.customData.adTagUrl, 0);
        }
      } else if (request.media.customData.vmapAdsRequest) {
        // VMAP requests
        addVmapBreakToMedia(request.media, request.media.customData.vmapAdsRequest);
      }
      // Live UI on CAF receiver
      if (request.media.customData.isLive) {
        request.media.streamType = cast.framework.messages.StreamType.LIVE;
        // for live stream - disable seek as we do not support DVR stream on Google Cast yet
        playerManager.removeSupportedMediaCommands(cast.framework.messages.Command.SEEK, true);
        playerManager.setMessageInterceptor(
          cast.framework.messages.MessageType.SEEK,
          seekData => {
            // if the SEEK supported media command is disabled, block seeking
            if (!(playerManager.getSupportedMediaCommands() && cast.framework.messages.Command.SEEK)) {
              return null;
            }
            return seekData;
          });
      }
      // DRM
      if (request.media.customData.licenseUrl) {
        playerManager.setMediaPlaybackInfoHandler((loadRequest, playbackConfig) => {
          playbackConfig.protectionSystem = cast.framework.ContentProtection.WIDEVINE;
          playbackConfig.licenseUrl = request.media.customData.licenseUrl;
          if (typeof request.media.customData.credentials === 'boolean' || typeof request.media.customData.licenseHeaders === 'object') {
            playbackConfig.licenseRequestHandler = requestInfo => {
              if (typeof request.media.customData.credentials === 'boolean') {
                requestInfo.withCredentials = request.media.customData.credentials;
              }
              if (typeof request.media.customData.licenseHeaders === 'object') {
                requestInfo.headers = request.media.customData.licenseHeaders;
              }
            };
          }
          // specific handling for casting DRM content with DRMtoday by castLabs
          if (request.media.customData.drmToday) {
            playbackConfig.licenseHandler = license => {
              try {
                // If widevine response
                const response = JSON.parse(new TextDecoder().decode(license));
                response.data = shaka.util.Uint8ArrayUtils.fromBase64(response.license);
                return response.data;
              } catch (e) {
                return null;
              }
            };
          }
          if (request.media.customData.enableUITextDisplayer) {
            playbackConfig.enableUITextDisplayer = request.media.customData.enableUITextDisplayer;
          }
          return playbackConfig;
        });
      }
      // additional custom data passed to the player through the googleCastData object setting
      /*if (request.media.customData.additionalData) {
        // Do something with request.media.customData.additionalData object
      }*/
    }
    return request;
  }
);

context.start(options);
