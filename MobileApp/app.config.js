import 'dotenv/config';

module.exports = {
  "expo": {
    "name": "EquiMap",
    "slug": "EquiMap",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/images/icon.png",
    "scheme": "EquiMap",
    "userInterfaceStyle": "automatic",
    "newArchEnabled": true,
    "ios": {
      "supportsTablet": true
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/images/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      },
      "package": "com.anonymous.EquiMap",
      "edgeToEdgeEnabled": true
    },
    "web": {
      "bundler": "metro",
      "output": "static",
      "favicon": "./assets/images/favicon.png"
    },
    "plugins": [
      "expo-router",
      [
        "expo-splash-screen",
        {
          "image": "./assets/images/splash-icon.png",
          "imageWidth": 200,
          "resizeMode": "contain",
          "backgroundColor": "#ffffff"
        }
      ],
      [
        "@rnmapbox/maps",
        {
          "RNMapboxMapsVersion": "11.0.0",
          "RNMapboxMapsDownloadToken": process.env.MAPBOX_DOWNLOAD_TOKEN
        }
      ]
    ],
    "experiments": {
      "typedRoutes": true
    },
    "extra":{
      "MAPBOX_ACCESS_TOKEN":process.env.MAPBOX_ACCESS_TOKEN
    }
  }
};