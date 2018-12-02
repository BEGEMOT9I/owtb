const path = require('path')
const webpack = require('webpack')
const Config = require('webpack-config').default
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin')
const ReactJssHmrPlugin = require('react-jss-hmr/webpack')

const { SETTINGS, WORKBOX, ENV, OUTPUT } = require('../variables')
const { getClientEntries } = require('../settings')
const { getClientPlugins } = require('../plugins')
const webpackerConfig = process.env.HMR ? SETTINGS.dev_server_hot : SETTINGS.dev_server

let config = new Config().extend('config/development/base.js').merge({
  mode: 'development',
  devtool: 'inline-cheap-source-map',
  entry: getClientEntries(),
  module: {
    rules: [
      {
        test: /\.(css)$/,
        use: [ExtractCssChunks.loader, 'css-loader']
      }
    ]
  },
  plugins: [
    ...getClientPlugins(ENV.DEVELOPMENT, webpackerConfig.hmr),
    new webpack.NoEmitOnErrorsPlugin()
  ],
  devServer: {
    host: webpackerConfig.host,
    port: webpackerConfig.port,
    headers: { 'Access-Control-Allow-Origin': '*' },
    historyApiFallback: true,
    hot: webpackerConfig.hmr,
    disableHostCheck: true,
    compress: true,
    progress: true,
    watchOptions: {
      aggregateTimeout: 500,
      poll: 1000
    }
  }
})

if (webpackerConfig.hmr) {
  config.merge({
    resolve: {
      plugins: [new ReactJssHmrPlugin()]
    },
    plugins: [
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 1
      }),
      new webpack.HotModuleReplacementPlugin()
    ]
  })
}

module.exports = config
