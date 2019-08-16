// 这是vue-cli脚手架工具的生产环境配置入口 package.json中的"build": "node build/build.js"的直接指向。

'use strict'
//版本检查 node的版本号  版本有要求"engines": {"node": ">= 4.0.0","npm": ">= 3.0.0"}
//立即执行
require('./check-versions')()
//process是node中的global全局对象的属性，process是node中的全局变量，env设置环境变量
process.env.NODE_ENV = 'production'
// ora是一个命令行转圈圈动画插件，好看用的
var ora = require('ora')
// rimraf插件是用来执行UNIX命令rm和-rf的用来删除文件夹和文件，清空旧的文件
var rm = require('rimraf')

const path = require('path')


// node.js路径模块 连接路径，例子：path.join('/foo', 'bar', 'baz/asdf', 'quux', '..');// 返回: '/foo/bar/baz/asdf'var path = require('p//chalk插件，用来在命令行中输入不同颜色的文字
var chalk = require('chalk')
// 引入webpack模块使用内置插件和webpack方法
var webpack = require('webpack')
//commonJs风格，引入文件模块，引入模块分为内置模块与文件模块两种
var config = require('../config')
var webpackConfig = require('./webpack.prod.conf')
// 开启转圈圈动画
var spinner = ora('building for production...')
spinner.start()
// 调用rm方法，第一个参数的结果就是 绝对/工程名/dist/static，表示删除这个路径下面的所有文件
rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
// 如果删除的过程中出现错误，就抛出这个错误，同时程序终止
  if (err) throw err
// 没有错误，就执行webpack编译
  webpack(webpackConfig, function (err, stats) {
// 这个回调函数是webpack编译过程中执行
    spinner.stop()// 停止转圈圈动画
    if (err) throw err　　// 如果有错误就抛出错误
// 没有错误就执行下面的代码，process.stdout.write和console.log类似，输出对象
////process.stdout用来控制标准输出，也就是在命令行窗口向用户显示内容。它的write方法等同于console.log
    process.stdout.write(stats.toString({
// stats对象中保存着编译过程中的各种消息
      colors: true,// 增加控制台颜色开关
      modules: false,// 不增加内置模块信息
      children: false,// 不增加子级信息
      chunks: false,// 允许较少的输出
      chunkModules: false  // 不将内置模块的信息加到包信息
    }) + '\n\n')
// 以上就是在编译过程中，持续打印消息 
// 下面是编译成功的消息
    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))
  })
})