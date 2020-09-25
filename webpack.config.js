const glob = require("glob");
const path = require("path");
const express = require ("express");
const production = process.env.NODE_ENV === 'production';
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const SVGSpritemapPlugin = require('svg-spritemap-webpack-plugin');
const FileManagerPlugin = require('filemanager-webpack-plugin');
const FixStyleOnlyEntriesPlugin = require("webpack-fix-style-only-entries");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// set this to your prefered theme
// or set it to empty string, if you only want your costum icons
const myTheme = "Lidl";

const uniqueFileNames = (pathArray , ext) => {
  let usedNames = [];
  let iconArray = [];
  for (let iconPath of pathArray.reverse ()) {
    const iconName = path.basename (iconPath, ext);
    if (!usedNames.includes (iconName)) {
      usedNames.push (iconName);
      iconArray.push (iconPath);
    }
  }
  return iconArray;
};

let iconList = uniqueFileNames ([
  //Sort the icons by importance! (the last line overwrites all previous ones, if the name equals)
  ...glob.sync ('./node_modules/@cake-hub/web-css_framework/assets/icons/{,!(_)*/,**/!(_)*/}!(_)*.svg'),
  ...glob.sync ('./src/assets/icons/{,!(_)*/,**/!(_)*/}!(_)*.svg'),
], '.svg')

if (myTheme) {
  iconList = uniqueFileNames ([
    //Sort the icons by importance! (the last line overwrites all previous ones, if the name equals)
    ...glob.sync ('./node_modules/@cake-hub/web-css_framework/assets/icons/{,!(_)*/,**/!(_)*/}!(_)*.svg'),
    ...glob.sync ('./node_modules/@cake-hub/web-css_framework/themes/' + myTheme + '/assets/icons/{,!(_)*/,**/!(_)*/}!(_)*.svg'),
    ...glob.sync ('./src/assets/icons/{,!(_)*/,**/!(_)*/}!(_)*.svg'),
  ], '.svg');
}

module.exports = {
  entry: {
   "js/app": "./src/js/app.js",
   "css/app": "./src/scss/app.scss",
  },
  devtool: (!production ? 'source-map' : false),
  module: {
    rules: [
      {
        test: /\.js$/,
        // exclude: /node_modules\//, (otherwise the @cake/web dependency does not get compiled!)
        exclude: /node_modules\/(?!(@cake-hub)\/).*/,
        use: {
          loader: "babel-loader",
          options: {
            "presets": [
              ["@babel/preset-env", {
                "modules": "commonjs",
                "useBuiltIns": "usage",
                "corejs": 3,
                "forceAllTransforms": true
              }],
            ],
            "comments": false
          }
        }
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: "style-loader" // creates style nodes from JS strings
          },
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: production,
            },
          },
          {
            loader: "css-loader", // translates CSS into CommonJS
            options: {
              url: false
            }
          },
          {
            loader: "postcss-loader",
            options: {
              plugins: () => [
                require('postcss-inline-svg')({
                  removeFill: true,
                  xmlns: true,
                  path: process.cwd () + '/'
                }),
                require('autoprefixer'),
              ]
            }
          },
          {
            loader: "sass-loader", // compiles Sass to CSS, using Dart-Sass by default
            options: {
              implementation: require('sass'),
            },
          },
        ]
      },
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(),
    new SVGSpritemapPlugin(
      iconList, {
      output: {
        filename: "assets/images/icon__sprite.svg",
        svgo: true,
      },
      sprite: {
        prefix: false,
      }
    }),
    new FileManagerPlugin ({
      onEnd: {
          copy: [
            { source: './src/assets/!(icons)/**/*',  destination: path.resolve(__dirname, './dist/assets')},
          ],
      }
    }),
    new FixStyleOnlyEntriesPlugin (),
  ],
  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
  },
  devServer: {
    contentBase: path.join(__dirname, 'static'),
    watchContentBase: true,
    compress: true,
    host: "0.0.0.0",
    port: 5000,
    open: true,
    serveIndex: true,
    writeToDisk: true,
    before: (app) => {
      // Also make static assets available to webpack-dev-server
      app.use ("/", express.static (path.join(__dirname, 'dist')))
    },
  },
};