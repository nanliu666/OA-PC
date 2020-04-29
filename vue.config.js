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
    //忽略的打包文件
    config.externals({
      vue: 'Vue',
      'vue-router': 'VueRouter',
      vuex: 'Vuex',
      axios: 'axios',
      'element-ui': 'ELEMENT'
    })
    const entry = config.entry('app')
    entry.add('babel-polyfill').end()
    entry.add('classlist-polyfill').end()
    entry.add('@/mock').end()
    config.plugin('html').tap((args) => {
      args[0].isProduction = isProduction
      return args /* 传递给 html-webpack-plugin's 构造函数的新参数 */
    })
  },
  devServer: {
    port: 1888,
    open: true,
    proxy: {
      '/api': {
        //本地服务接口地址
        // target: 'http://localhost',
        //远程演示服务地址,可用于直接启动项目
        target: 'https://saber.bladex.vip/api',
        ws: true,
        pathRewrite: {
          '^/api': '/'
        }
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
