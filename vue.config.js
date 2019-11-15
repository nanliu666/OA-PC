module.exports = {
  //路径前缀
  publicPath: "/",
  lintOnSave: true,
  productionSourceMap: false,
  chainWebpack: (config) => {
    //忽略的打包文件
    config.externals({
      'vue': 'Vue',
      'vue-router': 'VueRouter',
      'vuex': 'Vuex',
      'axios': 'axios',
      'element-ui': 'ELEMENT',
    })
    const entry = config.entry('app')
    entry
      .add('babel-polyfill')
      .end()
    entry
      .add('classlist-polyfill')
      .end()
    entry
      .add('@/mock')
      .end()
  },
  devServer: {
    port: 1888,
    proxy: {
      '/api': {
        //本地服务接口地址
        // target: 'http://localhost',
        //远程演示服务地址  其实官方已经提供了 让vue项目跑起来的服务器连接，好多人不知道这个
        target: 'https://saber.bladex.vip/api', 
        ws: true,
        pathRewrite: {
          '^/api': '/'
        }
      }
    }
  }
}
