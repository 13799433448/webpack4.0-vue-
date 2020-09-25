const { merge } = require('webpack-merge')
const developmentConfig = require('./webpack.config.js')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin

module.exports = merge(developmentConfig, {
  plugins: [new BundleAnalyzerPlugin()],
})
