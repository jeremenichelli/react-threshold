const path = require('path');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    'test': './demo/test.js'
  },
  output: {
    path: path.resolve('./'),
    filename: '[name].js',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: [ 'babel-loader' ]
      }
    ]
  },
  plugins: [
    new HTMLWebpackPlugin({
      title: 'ReactThreshold | Demo',
      template: './demo/index.ejs'
    })
  ],
  devtool: 'source-map',
  devServer: {
    stats: {
      warnings: false
    }
  },
};
