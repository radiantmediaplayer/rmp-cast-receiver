# rmp-cast-receiver

[Radiant Media Player](https://www.radiantmediaplayer.com) custom [Cast Application Framework](https://developers.google.com/cast/docs/caf_receiver_overview) (CAF) Receiver app

## Examples
- player.html: our production CAF custom receiver app
- player-drm.html: example for using DASH Widevine DRM in a custom CAF receiver app

Our production custom CAF receiver app (this is default in Radiant Media Player for version 5.2.0+) should cover most generic case-scenario. 
However you should consider developing your own custom CAF receiver app in the following cases:
- you need to support DRM: the DRM example above has been tested for DASH with Widevine DRM
- you need to apply your [own styling](https://developers.google.com/cast/docs/caf_receiver_features#styling-the-player) to the CAF player
- you need to implement some other kind of custom behaviour required by your project

Examples above are provided as starting points for Radiant Media Player users to develop a custom CAF Receiver app.
Please refer to Google docs [add Features to your CAF Receiver](https://developers.google.com/cast/docs/caf_receiver_features) for further documentation on building a custom CAF receiver app.

## Usage
Information on how use and develop a custom CAF receiver app [can be found here](https://github.com/googlecast/BasicReceiverCAF).

## Issues
Issues should be submitted in this GitHub page. We will do our best to review them.

## License for rmp-cast-receiver
rmp-cast-receiver is released under Apache License 2.0.

## License for Radiant Media Player
Radiant Media Player is a commercial HTML5 media player, not covered by the above MIT license. 

Radiant Media Player license can be found here: [https://www.radiantmediaplayer.com/terms-of-service.html](https://www.radiantmediaplayer.com/terms-of-service.html). 

You may request a free trial for Radiant Media Player at: https://www.radiantmediaplayer.com/free-trial.html.
