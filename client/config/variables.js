const { resolve, join } = require('path')
const { readFileSync } = require('fs')
const webpackConfigLoader = require('react-on-rails/webpackConfigLoader')

const configPath = resolve(__dirname, '../../config')
const packageJson = JSON.parse(readFileSync(resolve(__dirname, '../package.json'), 'utf8'))
const { output, settings } = webpackConfigLoader(configPath)

console.log(webpackConfigLoader(configPath))

const ENV = {
  PRODUCTION: 'production',
  DEVELOPMENT: 'development',
  STATS: JSON.stringify(join(output.publicPath, 'stats.json'))
}

const WORKBOX = {
  config: {
    clientsClaim: true,
    skipWaiting: true,
    include: [/\.(js|css)$/],
    exclude: [
      /\.js.map$/,
      /\.(jpe?g|png|gif|svg|otf|ttf|eot|woff|woff2)$/,
      /\.hot-update.(js|json)$/
    ],
    excludeChunks: ['sw'],
    cacheId: `${packageJson.name}_cache`,
    ignoreUrlParametersMatching: [/./]
  },
  path: JSON.stringify(join(output.publicPath, 'service-worker.js'))
}

const LOADERS_OPTIONS = {
  BABEL_LOADER: { babelrc: true, cacheDirectory: true },
  TS_LOADER: { transpileOnly: true },
  IMG_LOADER: {
    plugins: [
      require('imagemin-gifsicle')({ interlaced: false }),
      require('imagemin-mozjpeg')({
        progressive: true,
        arithmetic: false
      }),
      require('imagemin-optipng')({ optimizationLevel: 3 }),
      require('imagemin-pngquant')({
        floyd: 0.5,
        speed: 2
      }),
      require('imagemin-svgo')({
        plugins: [{ removeTitle: true }, { convertPathData: false }]
      })
    ]
  }
}

module.exports = { SETTINGS: settings, OUTPUT: output, WORKBOX, ENV, LOADERS_OPTIONS }
