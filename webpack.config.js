const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: ['babel-polyfill', './client/app.js'],
  output: {
    path: path.resolve('client/dist'),
    filename: 'app.bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        use: { loader: 'babel-loader' },
        exclude: /node_modules/
      },
      {
        test: /\.s*css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
      }
    ]
  },
  resolve: {
    modules: [path.join(process.cwd(), 'client'), 'node_modules'],
    extensions: ['.js', '.jsx']
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: false,
      minimize: true,
      compress: {
        warnings: false,
        drop_debugger: true,
        drop_console: false
      }
    })
  ],
  devtool: false
}
