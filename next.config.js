const withCSS = require("@zeit/next-css");
require("dotenv").config();
const path = require("path");
const Dotenv = require("dotenv-webpack");

/* Without CSS Modules, with PostCSS */
module.exports = withCSS({
  serverRuntimeConfig: {
    // Will only be available on the server side
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    RESTURL_SPEAKERS_PROD: "http://docker.local.com:4000/speakers",
    RESTURL_SPEAKER_PROD: "http://docker.local.com:4000/speaker",
    RESTURL_SESSIONS_PROD: "http://docker.local.com:4000/sessions",
  },
  webpack(config, options) {
    config.plugins = config.plugins || [];
    config.plugins = [
      ...config.plugins,
      // Read the .env file
      new Dotenv({
        path: path.join(__dirname, ".env"),
        systemvars: true,
      }),
    ];
    return config;
  },
});
