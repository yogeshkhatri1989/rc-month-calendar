var path = require("path");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var extractCSS = new ExtractTextPlugin({
                        filename: "[name].css",
                        allChunks: true
                      });

module.exports = {
  entry: {
    main: "./main.js",
    calendar: "./Calendar.js"
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: "",
    filename: "[name].js",
    libraryTarget: 'commonjs2',
    library: 'rc-month-calendar'
  },
  externals: {
    'react': 'react',
    'react-dom': 'react-dom'
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
        test: /\.less$/,
        loader: extractCSS.extract({fallback: "style-loader", use: "css-loader!less-loader"})
      }
    ]
  },
  plugins: [
    extractCSS
  ]
}