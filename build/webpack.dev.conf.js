const utils = require('/utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const path = require('path')
const baseWebpackConfig = require('./wwebpack.base.conf')
// 一个拷贝资源的插件
const CopyWebpackPlugin = require('copy-webpack-plugin')
// 生成html模板的插件，一个经常用到的webpack插件
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 一个更友好展示错误日志的插件
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
// 一个自动打开可用端口的包
const portfinder = require('portfinder')

// 当前环境的host
const HOST = process.env.HOST
// 当前环境的port
const PORT = process.env.PORT && Number(process.env.PORT)

// 开发环境的配置
const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    // loader的配置，具体内容可以参考utlis文件
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
  },
  devtool: config.dev.devtool,
  devServer: {
    // 重新加载server时，控制台对一些错误以warning的方式提示
    clientLogLevel: 'warning',
    historyApiFallback: {
      rewrites: [
      {from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html')},
      ],
    },
    // 启用weback的木块热替换特性
    hot: true,
    // 告诉服务器从哪里提供内容，只有在你想要提供静态文件时才需要，这里我们禁用
    contentBase: false,
    // 是否压缩
    compress: true,
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    // 是否自动打开浏览器
    open: config.dev.autoOpenBrowser,
    // 编译出错时是否有提示
    overlay: config.dev.errorOverlay ? { warnings: false, errors: true } : false,
    // 静态内容的路径，此路径下的打包文件可在浏览器中访问
    publicPath: config.dev.assetsPublicPath,
    // 接口的代理
    proxy: config.dev.proxyTable,
    // 启用quiet后， 除了初始启动信息之外的任何内容都不会被打印到控制台，这也意味着来自webpack的错误或警告在控制台不可见
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: config.dev.poll,
    }
  },
  plugins: [
    // DefinePlugin 允许创建一个在编译时可以配置的全局常量，这里生成了一个当前环境的常量
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')
    }),
    // 模块热替换插件，修改模块时不需要刷新页面
    new webpack.HotModuleReplacementPlugin(),
    // 当开启HMR的时候使用该插件会显示模块的相对路径
    new webpack.NamedModulesPlugin(),
    // 在编译出现错误时，使用NoEmitOnErrorsPlugin来跳过输出阶段，这样可以确保输出资源不会包含错误，
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      filename: 'indexhtml',
      template: 'indx.html',
      // 打包后的js文件放在body的最后
      inject: true
    }),
    // 将static的内容拷贝到开发路径，忽略这个文件夹下‘.xx’的文件
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.dev.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ]
})

module.exports = new Promis((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      process.env.PORT = port
      devWebpackConfig.devServer.port = port
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors ? utils.createNotifierCallback() : undefined
      }))
      resolve(devWebpackConfig)
    }
  })
})