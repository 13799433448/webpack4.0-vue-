const { merge } = require("webpack-merge")
const webpack = require("webpack")
const base = require("./webpack.config.base")
// 是webpack的插件，为模块提供中间缓存步骤。
// const HardSourceWebpackPlugin = require("hard-source-webpack-plugin") // 热更新 冷启动
module.exports = merge(base, {
  mode: "development",
  // SourceMap是一种映射关系。当项目运行后，如果出现错误，错误信息只能定位到打包后文件中错误的位置。
  // 如果想查看在源文件中错误的位置，则需要使用映射关系，找到对应的位置。
  devtool: "source-map",
  /* 配置webpack-dev-serve */
  /* 跨域也需要靠这个 */
  devServer: {
    historyApiFallback: true,
    overlay: true,
    openPage: "page1.html#/home",
    // 3）有服务端，但是不想用代理来处理，而是在服务端中启动webpack,web端口也用服务端端口
    //2）前端mock模拟数据，app为express里的app
    // before (app) {
    //   console.log('app', 111)
    //   app.get('/user', (req, res) => {
    //     res.json({ name: 'jack,before' })
    //   });
    // }
    // 1）
    // proxy: {// 重写方式，代理
    //   '/api': {
    //     target: 'http://localhost:3000',
    //     // changeOrigin: true,
    //     pathReWrite: { '^/api': '' }
    //   }
    // }
  },
  // HMR 绝对不能被用在生产环境。Hot Module Replacement
  plugins: [new webpack.HotModuleReplacementPlugin()],
})
