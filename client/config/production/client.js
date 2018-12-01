const path = require('path')
const webpack = require('webpack')
const Config = require('webpack-config').default
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin')
const workboxPlugin = require('workbox-webpack-plugin')
const StatsPlugin = require('stats-webpack-plugin')
const manifestPlugin = require('webpack-manifest-plugin')
const CompressionPlugin = require('compression-webpack-plugin')

const { SETTINGS, WORKBOX, ENV, OUTPUT, getEntries } = require('../variables')
const { getClientEntries, getOptimizations } = require('../settings')
const { getClientPlugins } = require('../plugins')

let config = new Config().extend('config/production/base.js').merge({
  entry: getClientEntries(),
  optimization: getOptimizations(),
  module: {
    rules: [
      {
        test: /\.(css)$/,
        use: [ExtractCssChunks.loader, 'css-loader']
      }
    ]
  },
  plugins: [
    ...getClientPlugins(ENV.DEVELOPMENT),
    new CompressionPlugin({
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8
    })
  ]
})

module.exports = config
