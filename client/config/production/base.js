const Config = require('webpack-config').default

let config = new Config().extend('config/base.js').merge({
  mode: 'production',
  module: {
    rules: [
      {
        test: /[^\/]+\/sprite(?:\/?[^\/]+)*\/?(?:\/[\w+])?.svg$/,
        use: {
          loader: 'svg-sprite-loader',
          options: { plainSprite: true }
        }
      }
    ]
  }
})

module.exports = config
