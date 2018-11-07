"use strict";
const webpack = require("webpack");
const merge = require("webpack-merge");
const baseWebpackConfig = require("./webpack.base.conf");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const FriendlyErrorsPlugin = require("friendly-errors-webpack-plugin");

module.exports = merge(baseWebpackConfig, {
  entry: {
    app: "./src/demo/main.js"
  },
  devtool: "#cheap-module-eval-source-map",
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: '"development"'
      }
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "index.html",
      inject: true
    }),
    new FriendlyErrorsPlugin()
  ],
  devServer: {
    historyApiFallback: true,
    open: true,
    hot: true,
    inline: true
  }
});
