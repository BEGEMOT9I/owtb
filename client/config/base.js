const path = require('path')
const webpack = require('webpack')
const manifestPlugin = require('webpack-manifest-plugin')
const Config = require('webpack-config').default
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

const { OUTPUT, LOADERS_OPTIONS, SETTINGS, WORKBOX } = require('./variables')
const { getOptimizations } = require('./settings')

module.exports = new Config().merge({
  context: path.resolve(__dirname, '../'),
  output: {
    filename: '[name].[hash].js',
    chunkFilename: '[name].[chunkhash].js',
    publicPath: OUTPUT.publicPath,
    path: OUTPUT.path
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    plugins: [new TsconfigPathsPlugin({ configFile: path.resolve(__dirname, '../tsconfig.json') })]
  },
  optimization: {
    minimizer: getOptimizations().minimizer
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /(node_modules|bower_compontents)/,
        use: [{ loader: 'babel-loader', options: LOADERS_OPTIONS.BABEL_LOADER }]
      },
      {
        test: /\.(js)$/,
        exclude: /(node_modules|bower_compontents)/,
        use: [{ loader: 'babel-loader', options: LOADERS_OPTIONS.BABEL_LOADER }]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        exclude: /sprite/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'assets/images/[name].[hash].[ext]'
            }
          },
          {
            loader: 'img-loader',
            options: LOADERS_OPTIONS.IMG_LOADER
          }
        ]
      },
      {
        test: /[^\/]+\/sprite(?:\/?[^\/]+)*\/?(?:\/[\w+])?.svg$/,
        use: {
          loader: 'svg-sprite-loader',
          options: { plainSprite: true }
        }
      },
      {
        test: /\.(otf|ttf|eot|woff|woff2)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'assets/fonts/[name].[hash].[ext]'
          }
        }
      }
    ]
  }
})
