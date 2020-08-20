const isProduction = process.env.NODE_ENV === 'production'
// const isProduction = true
const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}
const MomentLocalesPlugin = require('moment-locales-webpack-plugin')
const CompressWebpackPlugin = require('compress-webpack-plugin')

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
        gojs: 'go',
        html2canvas: 'html2canvas'
      })
    } else {
      config.externals({
        axios: 'axios',
        gojs: 'go'
      })
    }
    // it can improve the speed of the first screen, it is recommended to turn on preload
    config.plugin('preload').tap(() => [
      {
        rel: 'preload',
        // to ignore runtime.js
        // https://github.com/vuejs/vue-cli/blob/dev/packages/@vue/cli-service/lib/config/app.js#L171
        fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
        include: 'initial'
      }
    ])

    config.plugin('html').tap((args) => {
      args[0].isProduction = isProduction
      // 指定打包的js注入到head标签
      // args[0].inject = 'head'
      return args /* 传递给 html-webpack-plugin's 构造函数的新参数 */
    })

    // when there are many pages, it will cause too many meaningless requests
    config.plugins.delete('prefetch')

    config.when(isProduction, (config) => {
      config
        .plugin('ScriptExtHtmlWebpackPlugin')
        .after('html')
        .use('script-ext-html-webpack-plugin', [
          {
            // `runtime` must same as runtimeChunk name. default is `runtime`
            inline: /runtime\..*\.js$/
          }
        ])
        .end()

      config.optimization.splitChunks({
        chunks: 'all',
        cacheGroups: {
          libs: {
            name: 'chunk-libs',
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: 'initial' // only package third parties that are initially dependent
          },
          commons: {
            name: 'chunk-commons',
            test: resolve('src/components'), // can customize your rules
            minChunks: 3, //  minimum common number
            priority: 5,
            reuseExistingChunk: true
          }
        }
      })
      // https:// webpack.js.org/configuration/optimization/#optimizationruntimechunk
      config.optimization.runtimeChunk('single')
    })
  },
  devServer: {
    port: 1888,
    open: true,
    proxy: {
      '/api': {
        // 庆荣
        // target: 'http://192.168.1.37/',
        // 本地环境
        target: 'http://192.168.1.100:8000/',

        // 开发环境
        // target: 'http://122.112.183.186/',
        // target: 'http://apidev.epro.com.cn/',

        // 测试环境
        // target: 'http://122.112.190.144/',

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
    },
    plugins: [
      new MomentLocalesPlugin({
        localesToKeep: ['zh-cn']
      }),
      new CompressWebpackPlugin({
        asset: '[path].gz[query]',
        algorithm: 'gzip',
        test: new RegExp('\\.(js|css)$'),
        threshold: 10240,
        minRatio: 0.8
      })
    ]
  },
  css: {
    loaderOptions: {
      // 给 stylus-loader 传递选项
      stylus: {
        import: '~@/assets/style/global.styl'
      }
    }
  }
}
