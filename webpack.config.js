const path = require('path');
const webpack = require('webpack');
// 使用该插件,会自动创建并更新html文件
const HtmlWebpackPlugin = require('html-webpack-plugin');
//使用该插件 会清理每次打包后, 过去遗留在dist中的旧代码
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// 使用该插件 , 会解析vue文件
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const TerserPlugin = require('terser-webpack-plugin');
const fs = require("fs");
const pagesDirPath = path.resolve(__dirname, "./src/pages");
// 编译进度条
const WebpackBar = require('webpackbar');
// webpack 美化工具
const DashboardPlugin = require("webpack-dashboard/plugin");
/**
 * 通过约定，降低编码复杂度
 * 每新增一个入口，即在src/pages目录下新增一个文件夹，以页面名称命名，内置一个index.js作为入口文件
 * 通过node的文件api扫描pages目录
 * 这样可以得到一个形如{page1: "入口文件地址", page2: "入口文件地址", ...}的对象
 */
const getEntries = () => {
  let result = fs.readdirSync(pagesDirPath);
  let entry = {};
  result.forEach(item => {
      entry[item] = path.resolve(__dirname, `./src/pages/${item}/main.js`);
  });
  return entry;
}
/**
 * 扫描pages文件夹，为每个页面生成一个插件实例对象
 */
const generatorHtmlWebpackPlugins = () => {
  const arr = [];
  let result = fs.readdirSync(pagesDirPath);
  result.forEach(item => {
      //判断页面目录下有无自己的index.html
      let templatePath;
      let selfTemplatePath = pagesDirPath + `/${item}/index.html`;
      let publicTemplatePath = path.resolve(__dirname, "../src/public/index.html");
      try {
          fs.accessSync(selfTemplatePath);
          templatePath = selfTemplatePath;
      } catch {
          templatePath = publicTemplatePath;
      }
      arr.push(new HtmlWebpackPlugin({
          template: templatePath,
          filename: `${item}.html`,
          chunks: ["manifest", "vendor", item]
      }));
  });
  console.log(arr)
  return arr;
}

const createLoader = (name, options) => {
  return {
    loader: `${name}-loader`,
    options: options
  }
}
// 样式引用
const cssLoader = (type) => {
  const options = {
    sourceMap: false
  }
  return [
    createLoader('vue-style', options),
    {
      loader: MiniCssExtractPlugin.loader,
      options: { hmr: true }
    },
    createLoader('css', options)
  ].concat(type === 'css' ? [] : [].concat(type === 'sass' ? [{ loader: 'resolve-url-loader' }] : [])
    .concat([createLoader(type)]))
}
module.exports = {
  devtool: "source-map",
  mode: 'development',   //  webpack4.x版本中需要加入这个属性
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
        options: { // 内部配置
          transformAssetUrls: {
            video: ['src', 'poster'],
            source: 'src',
            img: 'src',
            image: 'xlink:href',
            embed: 'src'
          }
        }
      },
      {
        test: /\.(js|ts)$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.css$/,
        use: cssLoader('css')
      },
      {
        test: /.less$/,
        use: cssLoader('less')
      },
      {
        test: /\.sc|ass$/,
        use: cssLoader('sass')
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
        loader: 'file-loader'
      }
    ],
  },
  /* 配置webpack-dev-serve */
  devServer: {
    historyApiFallback: true,
    overlay: true
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
    new VueLoaderPlugin()
  ],
  mode: "development",
  // 配置模块如何被解析, 即设定相对应模块的解析规则
  resolve: {
    // 自动补全的扩展名
    extensions: ['.js', '.vue', '.json'],
    // 默认路径代理
    // 例如 import Vue from 'vue'，会自动到 'vue/dist/vue.common.js'中寻找
    // 这样可以使之后在开发项目的时候, 引用文件时不必关注不同层级的问题
    alias: {
      '@': path.join(__dirname, './', 'src'),
      '@api': path.join(__dirname, './', 'src/api'),
      '@styles': path.join(__dirname, './', 'src/styles'),
      '@config': path.join(__dirname, './', 'config'),
      'vue$': 'vue/dist/vue.esm.js',
      '@components': path.join(__dirname, './', 'src/components')
    }
  }
};
/*
修改webpack.config.js，判断NODE_ENV为production时，压缩js代码
*/
if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map';
  
  module.exports.optimization = {
    minimizer: [
      new TerserPlugin({
        cache: true, // 开启缓存
        parallel: true, // 支持多进程
        sourceMap: true,
      }),
    ]
  }
}
