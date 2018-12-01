const Config = require('webpack-config').default

let configs = []

const clientConfig = new Config().extend('config/[NODE_ENV]/client.js')
configs.push(clientConfig)

module.exports = configs
