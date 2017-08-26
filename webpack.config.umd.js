const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    'react-threshold': './src/react-threshold'
  },
  output: {
    path: path.resolve('./dist'),
    filename: '[name].js',
    libraryTarget: 'umd',
    library: 'ReactThreshold'
  },
  externals: [
    {
      react: {
        root: 'React',
        commonjs2: 'react',
        commonjs: 'react',
        amd: 'react'
      }
    },
    {
      'react-dom': {
        root: 'ReactDOM',
        commonjs2: 'react-dom',
        commonjs: 'react-dom',
        amd: 'react-dom'
      }
    }
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: [ 'babel-loader' ]
      }
    ]
  },
  // plugins: [
  //   new webpack.optimize.ModuleConcatenationPlugin()
  // ]
};
