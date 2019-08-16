'use strict'

const path = require('path')

module.exports = {
  dev: { // dev 环境
    env: require('./dev.env'), // 使用 config/dev.env.js 中定义的编译环境
    prot: 8080, // 运行测试页面的端口
    assetsSubDirectory: 'static', // 编译输出的二级目录
    assetsPublicPath: '/', // 编译发布的根目录，可配置为资源服务器域名或 CDN 域名
    proxyTable: { // 需要 proxyTable 代理的接口（可跨域）
      '/api': {
        target: 'http://portal.ava-test.kysto.com/api', // 代理的目标url
        changeOrigin: true, // 允许跨域
        pathRewrite: {
          '^/api': '' // 请求的时候使用这个api就可以
        }
      }
    },
    cssSourceMap: false, // 是否开启 cssSourceMap
    autoOpenBrowser: false, // 是否自动打开浏览器
    errorOverLay: true, // errorOverlay查询错误
    notifyOnErrors: true, // notifyOnErrors通知错误
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions- 是跟devserver相关的一个配置，webpack为我们提供的devserver是可以监控文件改动的，但在有些情况下却不能工作，我们可以设置一个轮询（poll）来解决
    useEslint: true, // useEslint是否使用eslint
    showEslintErrorsInOverlay: false, // showEslintErrorsInOverlay是否展示eslint的错误提示
    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'source-map', // webpack提供的用来方便调试的配置，它有四种模式，可以查看webpack文档了解更多
    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true // 一个配合devtool的配置，当给文件名插入新的hash导致清楚缓存时是否生成souce maps，默认在开发环境下为true
  },
  build: { // production 环境
    env: require('./prod.env'), // 使用 config/prod.env.js 中定义的编译环境
    index: path.resolve(__dirname, '../dist/index.html'), // 编译输入的 index.html 文件
    assetsRoot: path.resolve(__dirname, '../dist'), // 编译输出的静态资源路径
    assetsSubDirectory: 'static', // 编译输出的二级目录
    assetsPublicPath: '/', // 编译发布的根目录，可配置为资源服务器域名或 CDN 域名
    productionSourceMap: true, // 是否卡其cssSourceMap
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map', // webpack提供的用来方便调试的配置，它有四种模式，可以查看webpack文档了解更多

    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false, // 是否开启 gzip
    productionGzipExtensions: ['js', 'css'], // 需要使用 gzip 压缩的文件扩展名

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report // 是否开启打包后的分析报告
  }
}