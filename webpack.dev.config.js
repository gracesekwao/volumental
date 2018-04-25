const base = require('./webpack.config')
const webpack = require('webpack')
const path = require('path')

module.exports = Object.assign(base, {
  devtool: 'source-map',
  plugins: [new webpack.HotModuleReplacementPlugin()],
  devServer: {
    contentBase: path.join(__dirname, 'client'),
    compress: true,
    port: 8080,
    hot: true,
    watchContentBase: true,
    historyApiFallback: true,
    clientLogLevel: 'warning',
  }
})
