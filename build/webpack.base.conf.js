 //引入依赖模块
 var path = require('path')
 // 引入config目录下的index.js配置文件，主要用来定义一些开发和生产环境的属性
 var config = require('../config') // 获取配置
 // 引入utils工具模块，具体查看我的博客关于utils的解释，utils主要用来处理css-loader和vue-style-loader的
 var utils = require('./utils')