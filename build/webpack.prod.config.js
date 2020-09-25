const { merge } = require('webpack-merge')
const developmentConfig = require('./webpack.config.js')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin

module.exports = merge(developmentConfig, {
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: 'server',
      analyzerHost: '127.0.0.1',
      analyzerPort: 8889,
      reportFilename: 'report.html',
      defaultSizes: 'parsed',
      openAnalyzer: true,
      generateStatsFile: false,
      statsFilename: 'stats.json',
      statsOptions: null,
      logLevel: 'info',
    }),
  ],
  optimization: {
    minimize: true, //打开压缩丑化
  },
  // 大文件 额外移除打包
  // externals: {
  //   vue: 'Vue',
  //   'element-ui': 'ElementUI',
  // },
})
