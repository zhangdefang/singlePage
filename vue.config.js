const utils = require('./utils/utils')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  publicPath: './',
  pages: utils.getPages(),
  filenameHashing: false,
  transpileDependencies: [
    'node_modules/usp-ui',
    '/node_modules/resize-detector',
    'src'
  ],

  //  runtimeCompiler: false, // 是否使用包含运行时编译器的Vue核心的构建。
  productionSourceMap: !isProd,
  devServer: {
    proxy: {
      '/apis': {  //商用库数据集后台服务代理
        target: 'http://192.1.121.121:9000', // 接口域名
        // secure: false,
        changeOrigin: true, //是否跨域
        pathRewrite: {
          '^/apis': ''  //需要rewrite,pms应修改为应用在osp平台实际上下文
        }
      },
    }
  },
  configureWebpack: config => {
    config.optimization = {
      splitChunks: {
        chunks: 'all',
        minSize: 30000,
        minChunks: 2,
        maxAsyncRequests: 5,
        maxInitialRequests: 3,
        cacheGroups: {
          default: false,
          vendors: false,
          layer: {
            test: /[\\/]node_modules[\\/]vue-layer[\\/]/,
            name: 'chunk-layer',
            chunks: 'all',
            priority: 5
          },
          uspui: {
            test: /[\\/]node_modules[\\/]usp-ui[\\/]/,
            name: 'chunk-uspui',
            chunks: 'all',
            priority: 5
          },
          common: {
            test: /[\\/]node_modules[\\/]/,
            chunks: 'all',
            minChunks: 2,
            name: 'chunk-vendors'
          }
        }
      }
    }
    if (isProd) {
      // 开启gzip压缩
      return {
        plugins: [
          new CompressionWebpackPlugin({
            test: /\.js$|\.html$|\.css/,
            //需要压缩的文件正则
            threshold: 10240, //文件大小大于这个值时启用压缩
            deleteOriginalAssets: false //压缩后保留原文件
          })
        ]
      }
    }
  },
  //允许对内部的 webpack 配置进行更细粒度的修改。
  chainWebpack: config => {
    if (process.env.NODE_ENV !== 'production') {
      config.resolve.alias.set('vue$', 'vue/dist/vue.js')
      // config
      //   .plugin('webpack-bundle-analyzer')
      //   .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
    } else {
      // config.resolve.alias.set('vue$', 'vue/dist/vue.js')
      // config
      //   .plugin('webpack-bundle-analyzer')
      //   .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
    }
  }
}
