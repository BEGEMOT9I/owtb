const webpack = require('webpack')
const path = require('path')
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin')
const workboxPlugin = require('workbox-webpack-plugin')
const StatsPlugin = require('stats-webpack-plugin')
const manifestPlugin = require('webpack-manifest-plugin')

const { OUTPUT, LOADERS_OPTIONS, SETTINGS, WORKBOX, ENV } = require('./variables')

const getClientPlugins = (environment, hmr = false) => {
  const isDev = environment === ENV.DEVELOPMENT

  const plugins = [
    new LodashModuleReplacementPlugin(),
    new HardSourceWebpackPlugin({
      cacheDirectory: path.resolve(__dirname, '../node_modules/.cache/hard-source/[confighash]'),
      environmentHash: {
        root: path.resolve(__dirname, '../'),
        directories: ['config'],
        files: ['yarn.lock', 'tsconfig.json', '.babelrc']
      }
    }),
    new HardSourceWebpackPlugin.ExcludeModulePlugin([
      {
        // HardSource works with mini-css-extract-plugin but due to how
        // mini-css emits assets, assets are not emitted on repeated builds with
        // mini-css and hard-source together. Ignoring the mini-css loader
        // modules, but not the other css loader modules, excludes the modules
        // that mini-css needs rebuilt to output assets every time.
        test: /mini-css-extract-plugin[\\/]dist[\\/]loader/
      }
    ]),
    isDev &&
      new ForkTsCheckerWebpackPlugin({
        tsconfig: path.resolve(__dirname, '../tsconfig.json'),
        tslint: path.resolve(__dirname, '../tslint.json'),
        checkSyntacticErrors: true,
        memoryLimit: 1024,
        workers: ForkTsCheckerWebpackPlugin.ONE_CPU,
        async: true
      }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(environment)
      },
      SW_PATH: WORKBOX.path
    }),
    new StatsPlugin('stats.json'),
    new workboxPlugin.GenerateSW(WORKBOX.config),
    new ExtractCssChunks({
      filename: '[name].css',
      chunkFilename: '[id].css',
      hot: hmr
    }),
    new manifestPlugin({
      publicPath: OUTPUT.publicPath,
      writeToFileEmit: true
    })
  ]

  return plugins
}

module.exports = { getClientPlugins }
