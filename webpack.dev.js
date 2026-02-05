const { merge } = require('webpack-merge');
const path = require('path');
const common = require('./webpack.common.js');

module.exports = (env, argv) => {
  return merge(common(env, argv), {
    mode: 'development',
    output: {
      filename: 'js/[name].js',
      publicPath: '/'
    },
    devtool: 'eval-cheap-module-source-map',
    devServer: {
      static: path.resolve(__dirname, 'dist'),
      port: 3000,
      open: true,
      hot: true,
      historyApiFallback: true
    },
    optimization: {
      runtimeChunk: 'single'
    }
  });
};
