// webpack.config.dev.js
var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  devtool: 'cheap-eval-source-map',
  entry: [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/dev-server',
    './src/index.ts'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  ],
  module: {
    loaders: [{
      test: /\.css$/,
      loaders: ['style', 'css']
    }, {
        test: /\.js$/,
        loaders: ['babel'],
        include: path.join(__dirname, 'src')
      }, {
        test: /\.ts$/,
        loader: 'ts-loader',
        exclude: [/\.(spec|e2e)\.ts$/],
        include: path.join(__dirname, 'src')
      }, {
        test: /\.html$/,
        loader: "raw-loader" // loaders: ['raw-loader'] is also perfectly acceptable.
      }]
  },
  devServer: {
    contentBase: './dist',
    hot: true
  }
}