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

/* this is an internal playground CAF app JS - DO NOT USE */


const context = cast.framework.CastReceiverContext.getInstance();
const playerManager = context.getPlayerManager();
const options = new cast.framework.CastReceiverOptions();
// DO NOT set maxInactivity for published apps
//options.maxInactivity = 3600;
const playbackConfig = new cast.framework.PlaybackConfig();
/*playbackConfig.manifestRequestHandler = requestInfo => {
  requestInfo.withCredentials = true;
};*/

//playbackConfig.initialBandwidth = 1000000;
options.playbackConfig = playbackConfig;

/*playerManager.addEventListener(cast.framework.events.category.CORE,
  event => {
    console.log(event);
  });*/

/*playerManager.addEventListener(
  cast.framework.events.EventType.PLAYER_LOAD_COMPLETE, () => {
    const audioTracksManager = playerManager.getAudioTracksManager();

    // Get all audio tracks
    const tracks = audioTracksManager.getTracks();

    // Choose the first audio track to be active by specifying its ID
    audioTracksManager.setActiveById(tracks[3].trackId);
  });*/

playerManager.addEventListener(
  cast.framework.events.EventType.PLAYER_LOAD_COMPLETE, () => {
    const textTracksManager = playerManager.getTextTracksManager();

    // Get all text tracks
    const tracks = textTracksManager.getTracks();
    window.console.log(tracks);
    let minTrackId;
    for (let i = 0, len = tracks.length; i < len; i++) {
      if (!minTrackId) {
        minTrackId = tracks[i].trackId;
      } else {
        if (tracks[i].trackId < minTrackId) {
          minTrackId = tracks[i].trackId;
        }
      }
    }

    // Choose the first text track to be active by its ID
    textTracksManager.setActiveByIds([minTrackId]);
  });

context.start(options);
