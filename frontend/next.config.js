const withCSS = require("@zeit/next-css");

const nextEnv = require("next-env");
const dotenvLoad = require("dotenv-load");

dotenvLoad();

const withNextEnv = nextEnv();

module.exports = withNextEnv(
  withCSS({
    webpack(config) {
      config.module.rules.push({
        test: /\.svg$/,
        use: {
          loader: "@svgr/webpack",
          options: {
            icon: true
          }
        }
      });

      return config;
    }
  })
);
