const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const {
  paths,
  outputFiles,
  rules,
  plugins,
  resolve,
  stats,
  IS_DEVELOPMENT,
  IS_PRODUCTION,
} = require('./webpack/config');

const devServer = require('./webpack/dev-server').devServer;

// entry point of the app
const entry = [
  path.join(paths.javascript, 'client.js'),
];

plugins.push(
  // builds index.html from template
  new HtmlWebpackPlugin({
    template: path.join(paths.source, 'index.html'),
    path: paths.build,
    filename: 'index.html',
  })
);

if (IS_DEVELOPMENT) {
  plugins.push(
    // enables hot module replacement
    new webpack.HotModuleReplacementPlugin(),
    // disables the hot module replacement
    // when there are errors
    new webpack.NoEmitOnErrorsPlugin()
  );
  entry.unshift('babel-polyfill');
}

module.exports = {
  mode: IS_PRODUCTION ? 'production' : 'development',
  devtool: IS_PRODUCTION ? false : 'cheap-eval-source-map',
  context: paths.javascript,
  watch: !IS_PRODUCTION,
  entry,
  output: {
    path: paths.build,
    publicPath: '/',
    filename: outputFiles.client,
  },
  module: {
    rules,
  },
  plugins,
  resolve,
  stats,
  devServer,
  optimization: {
    minimize: IS_PRODUCTION,
    splitChunks: {
      cacheGroups: {
        vendor: {
          chunks: 'initial',
          test: path.resolve(__dirname, 'node_modules'),
          name: 'vendor',
          filename: outputFiles.vendor,
          enforce: true,
        },
      },
    },
  },
};
