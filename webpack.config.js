var path = require("path");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var CopyWebpackPlugin = require('copy-webpack-plugin');

var extractCSS = new ExtractTextPlugin({
                        filename: "style.css",
                        allChunks: true
                      });

module.exports = {
  entry: {
    main: "./main.js"
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: "",
    filename: "[name].js"
  },
  devServer: {
    hot: true,
    inline: true,
    port: 3000
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: [
            "es2015",
            "react"
          ]
        }
      },
      { 
        test: /\.css$/, 
        loader: extractCSS.extract({fallback: "style-loader", use: "css-loader"})
      },
      {
        test: /\.less$/,
        loader: extractCSS.extract({fallback: "style-loader", use: "css-loader!less-loader"})
      }
    ]
  },
  plugins: [
    extractCSS,
    new CopyWebpackPlugin([
      { from: './index.html' },
    ])
  ]
}