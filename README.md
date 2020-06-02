# rmp-cast-receiver

[Radiant Media Player](https://www.radiantmediaplayer.com) custom [Cast Application Framework](https://developers.google.com/cast/docs/caf_receiver_overview) (CAF) Receiver app

## Usage
Our production custom CAF receiver app is default in Radiant Media Player since version 5.2. It should cover most case-scenario, including HLS or DASH streaming, video ads and Widevine DRM. This app consists of:
- player.html: HTML layout for CAF player
- css/player.min.css: CSS for CAF player (css/player.css for uncompressed file)
- js/prod/player.min.js: JavaScript for CAF player (js/dev/player.js for uncompressed file) - this is where the logic between Radiant Media Player and our custom CAF receiver app is built

You may consider developing your own custom CAF receiver app, while using our custom CAF receiver app as a baseline, in the following cases:
- you need to apply your [own styling](https://developers.google.com/cast/docs/caf_receiver/core_features#styling-the-player) to the CAF player
- you need to implement some other kind of custom behaviour required by your project

Please refer to Google docs [add Features to your CAF Receiver](https://developers.google.com/cast/docs/caf_receiver/core_features) for further documentation on building a custom CAF receiver app.

## Issues
Issues should be submitted in this GitHub page. We will do our best to review them.

## License for rmp-cast-receiver
rmp-cast-receiver is released under Apache License 2.0.

## License for Radiant Media Player
Radiant Media Player is a commercial HTML5 media player, not covered by the above MIT license. 

Radiant Media Player license can be found here: [https://www.radiantmediaplayer.com/terms-of-service.html](https://www.radiantmediaplayer.com/terms-of-service.html). 

You may request a free trial for Radiant Media Player at: https://www.radiantmediaplayer.com/free-trial.html.
