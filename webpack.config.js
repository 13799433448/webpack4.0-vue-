const path = require('path')
const webpack = require('webpack')
// 使用该插件,会自动创建并更新html文件
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 使用该插件 会清理每次打包后, 过去遗留在dist中的旧代码
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// 使用该插件 , 会解析vue文件
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const TerserPlugin = require('terser-webpack-plugin')
const fs = require('fs')
const pagesDirPath = path.resolve(__dirname, './src/pages')
// 编译进度条
const WebpackBar = require('webpackbar')
// webpack 美化工具
const DashboardPlugin = require('webpack-dashboard/plugin')
// 自动生成路由
const VueRouteWebpackPlugin = require('@xiyun/vue-route-webpack-plugin')
// 加快编译
const HappyPack = require('happypack')
// 显示打包时间
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const chalk = require('chalk')
/**
 * 通过约定，降低编码复杂度
 * 每新增一个入口，即在src/pages目录下新增一个文件夹，以页面名称命名，内置一个index.js作为入口文件
 * 通过node的文件api扫描pages目录
 * 这样可以得到一个形如{page1: "入口文件地址", page2: "入口文件地址", ...}的对象
 */
const getEntries = () => {
  const result = fs.readdirSync(pagesDirPath)
  const entry = {}
  result.forEach((item) => {
    entry[item] = path.resolve(__dirname, `./src/pages/${item}/main.ts`)
  })
  return entry
}
/**
 * 扫描pages文件夹，为每个页面生成一个插件实例对象
 */
const generatorHtmlWebpackPlugins = () => {
  const arr = []
  const result = fs.readdirSync(pagesDirPath)
  result.forEach((item) => {
    // 判断页面目录下有无自己的index.html
    let templatePath
    const selfTemplatePath = pagesDirPath + `/${item}/index.html`
    const publicTemplatePath = path.resolve(
      __dirname,
      '../src/public/index.html'
    )
    try {
      fs.accessSync(selfTemplatePath)
      templatePath = selfTemplatePath
    } catch {
      templatePath = publicTemplatePath
    }
    arr.push(
      new HtmlWebpackPlugin({
        template: templatePath, // html模板路径
        filename: `${item}.html`, // 生成的html存放路径，相对于 path
        chunks: ['manifest', 'vendor', item], // 加载指定模块中的文件，否则页面会加载所有文件
        hash: false, // 为静态资源生成hash值
      })
    )
  })
  return arr
}
/**
 * 扫描pages文件夹，为每个页面生成路由 自动生成路由emmmm失败，暂时先注释
 */
const vueRoutePlugins = () => {
  const arr = []
  const result = fs.readdirSync(pagesDirPath)
  result.forEach((item) => {
    console.log(item)
    arr.push(
      new VueRouteWebpackPlugin({
        // 文件扩展名，默认只查询 .vue 类型的文件，根据实际需要可以进行扩展
        extension: ['vue', 'js', 'jsx'],
        // 配置 import 路径前缀
        prefix: '@/',
        // 插件扫描的项目目录，默认会扫描 "src/pages" 下的子目录
        directory: `src/pages/${item}`,
        // 生成的路由文件存放地址，默认存放到 "src/router/index.js"
        routeFilePath: `src/pages/${item}/router/children.ts`,
        // 生成的文件中的 import 路径是否使用双引号规范，默认使用
        // 注意：生成的路由文件中的 path 的引号是原封不动使用用户的
        doubleQoute: false,
      })
    )
  })
  return arr
}

const createLoader = (name, options) => {
  return {
    loader: `${name}-loader`,
    options: options,
  }
}
// 样式引用
const cssLoader = (type) => {
  const options = {
    sourceMap: false,
  }
  return [
    createLoader('vue-style', options),
    {
      loader: MiniCssExtractPlugin.loader,
      options: { hmr: true },
    },
    createLoader('css', options),
  ].concat(
    type === 'css'
      ? []
      : []
          .concat(type === 'sass' ? [{ loader: 'resolve-url-loader' }] : [])
          .concat([createLoader(type)])
  )
}
module.exports = {
  devtool: 'source-map',
  mode: 'development', //  webpack4.x版本中需要加入这个属性
  /* webpack 入口起点*/
  // 入口,起点或是应用程序的起点入口。从这个起点开始，应用程序启动执行。如果传递一个数组，那么数组的每一项都会执行。
  // 每个 HTML 页面都有一个入口起点。单页应用(SPA)：一个入口起点，多页应用(MPA)：多个入口起点。
  // 一般指向项目中,src目录下的main.js文件
  entry: getEntries(),
  /* webpack 输出*/
  // 输出, 指示 webpack 如何去输出、以及在哪里输出你的「bundle、asset 和其他你所打包或使用 webpack 载入的任何内容」
  // 指的是通过webpack打包后的生成的文件以什么名称, 放置在什么位置,  这里一般放置在dist目录下,
  // output: {
  //   path: path.resolve(__dirname, './dist'), // 项目的打包文件路径
  //   publicPath: '/dist/', // 通过devServer访问路径
  //   filename: 'build.js' // 打包后的文件名
  // },
  // 这个属性,用于设定项目中不同类型的模块所对应的处理规则, 即用到的一些, 诸如sass,less, css, vue, 图片, 文件, 都在
  // 这个属性中进行设置处理规则, 当然, 都会有对应处理的loader.  loader 用于对模块的源代码进行转换
  module: {
    rules: [
      {
        test: /.vue$/, // 匹配对象的后缀, 如这里匹配.vue文件
        loader: 'vue-loader', // 用于转换该文件类型的loader,
        options: {
          // 内部配置
          transformAssetUrls: {
            video: ['src', 'poster'],
            source: 'src',
            img: 'src',
            image: 'xlink:href',
            embed: 'src',
          },
        },
      },
      {
        test: /\.(js|ts)$/,
        loader: 'happypack/loader?id=happyBabel',
        exclude: /node_modules/,
        // happypack 使用options会报错
        // use: {
        //   loader: 'babel-loader',
        //   options: {
        //     presets: ['@babel/preset-env'],
        //   },
        // },
      },
      {
        test: /\.(js|vue|tsx?)$/,
        exclude: /node_modules/,
        enforce: 'pre',
        loader: 'eslint-loader',
        options: {
          formatter: require('eslint-friendly-formatter'),
          emitError: true,
          failOnWarning: true,
          failOnError: true,
        },
      },
      {
        test: /\.ts?$/,
        loader: 'ts-loader',
        options: {
          appendTsSuffixTo: [/\.vue$/],
          allowTsInNodeModules: true,
        },
      },
      {
        test: /\.css$/,
        use: cssLoader('css'),
      },
      {
        test: /.less$/,
        use: cssLoader('less'),
      },
      {
        test: /\.sc|ass$/,
        use: cssLoader('sass'),
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
        loader: 'file-loader',
      },
    ],
  },
  /* 配置webpack-dev-serve */
  devServer: {
    historyApiFallback: true,
    overlay: true,
    openPage: 'page1.html#/home',
  },
  /* 插件配置 */
  // 自定义webpack构建过程, 例如，当多个 bundle 共享一些相同的依赖，使用 CommonsChunkPlugin 有助于提取这些依赖到共享的 bundle 中，来避免重复打包
  plugins: [
    /* HTML 生成插件 */
    ...generatorHtmlWebpackPlugins(),
    // 添加 进度条
    new WebpackBar(),
    // 美化工具
    new DashboardPlugin(),
    new MiniCssExtractPlugin(),
    new CleanWebpackPlugin(),
    new webpack.HashedModuleIdsPlugin(),
    new VueLoaderPlugin(),
    ...vueRoutePlugins(),
    new HappyPack({
      // 用id来标识 happypack处理那里类文件
      id: 'happyBabel',
      // 如何处理  用法和loader 的配置一样
      loaders: [
        {
          loader: 'babel-loader',
        },
      ],
      // 允许 HappyPack 输出日志
      verbose: true,
    }),
    new ProgressBarPlugin({
      format:
        '  build [:bar] ' +
        chalk.green.bold(':percent') +
        ' (:elapsed seconds)',
      clear: false,
    }),
  ],
  // eslint-disable-next-line no-dupe-keys
  mode: 'development',
  // 配置模块如何被解析, 即设定相对应模块的解析规则
  resolve: {
    // 自动补全的扩展名
    extensions: ['.js', '.css', '.vue', '.json', '.ts'],
    // 默认路径代理
    // 例如 import Vue from 'vue'，会自动到 'vue/dist/vue.common.js'中寻找
    // 这样可以使之后在开发项目的时候, 引用文件时不必关注不同层级的问题
    alias: {
      '@': path.resolve(__dirname, './', 'src'),
      '@api': path.resolve(__dirname, './', 'src/api'),
      '@styles': path.resolve(__dirname, './', 'src/styles'),
      '@config': path.resolve(__dirname, './', 'config'),
      vue$: 'vue/dist/vue.esm.js',
      '@components': path.resolve(__dirname, './', 'src/components'),
    },
  },
}
/*
修改webpack.config.js，判断NODE_ENV为production时，压缩js代码
*/
if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'

  module.exports.optimization = {
    minimizer: [
      new TerserPlugin({
        cache: true, // 开启缓存
        parallel: true, // 支持多进程
        sourceMap: true,
      }),
    ],
  }
}
