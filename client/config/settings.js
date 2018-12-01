const TerserPlugin = require('terser-webpack-plugin')

const getOptimizations = () => ({
  minimize: true,
  minimizer: [
    new TerserPlugin({
      sourceMap: false,
      cache: true,
      parallel: true
    })
  ]
})

const getClientEntries = () => ({
  client: ['./src/startup/client']
})

module.exports = { getClientEntries, getOptimizations }
