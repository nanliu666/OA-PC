const isProduction = process.env.NODE_ENV === 'production'
const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  //路径前缀
  publicPath: '/',
  lintOnSave: true,
  productionSourceMap: false,
  chainWebpack: (config) => {
    const entry = config.entry('app')
    entry.add('babel-polyfill').end()
    entry.add('classlist-polyfill').end()
    //忽略的打包文件
    if (isProduction) {
      config.externals({
        vue: 'Vue',
        'vue-router': 'VueRouter',
        vuex: 'Vuex',
        axios: 'axios',
        'element-ui': 'ELEMENT',
        gojs: 'go'
      })
    } else {
      config.externals({
        gojs: 'go'
      })
      entry.add('@/mock').end()
    }

    config.plugin('html').tap((args) => {
      args[0].isProduction = isProduction
      // 指定打包的js注入到head标签
      // args[0].inject = 'head'
      return args /* 传递给 html-webpack-plugin's 构造函数的新参数 */
    })
  },
  devServer: {
    port: 1888,
    open: true,
    proxy: {
      '/api': {
        // 本地环境
        // target: 'http://192.168.1.100:8000/',
        //
        // 开发环境
        // target: 'http://122.112.183.186/',
        // target: 'http://apidev.epro.com.cn/',

        // 测试环境
        target: 'http://122.112.190.144/',

        // saber远程演示服务地址
        // target: 'https://saber.bladex.vip/',
        ws: true,
        changeOrigin: true
      }
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        src: resolve('src')
      }
    }
  }
}
