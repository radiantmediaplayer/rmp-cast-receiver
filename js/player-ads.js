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

(function () {

  'use strict';

  const context = cast.framework.CastReceiverContext.getInstance();
  const playerManager = context.getPlayerManager();
  var ad = {
    getBreakClipTitle: function () {
      return 'RMP AD';
    },
    getBreakClipUrl: function () {
      return 'https://www.rmp-streaming.com/vast/mp4s/ad-10s.mp4';
    },
    getBreakClipContentType: function () {
      return 'video/mp4';
    },
    getBreakClipPosterUrl: function () {
      return 'https://www.radiantmediaplayer.com/images/poster-rmp-ads.jpg';
    },
    getBreakClipPosition: function () {
      return 0;
    }
  };

  function addBreakToMedia(media) {
    media.breakClips = [{
      id: 'bc1',
      title: ad.getBreakClipTitle(),
      contentId: ad.getBreakClipUrl(),
      contentType: ad.getBreakClipContentType(),
      posterUrl: ad.getBreakClipPosterUrl(),
      whenSkippable: 5
    }];
    media.breaks = [{
      id: 'b1',
      breakClipIds: ['bc1'],
      position: ad.getBreakClipPosition()
    }];
  };
  playerManager.setMessageInterceptor(
    cast.framework.messages.MessageType.LOAD,
    request => {
      addBreakToMedia(request.media);
      return request;
    });
  context.start();

})();