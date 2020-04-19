const path = require('path');
const webpack = require('webpack');

const isProd = ["production", "prod"].includes(process.env.NODE_ENV) && !process.env.lib_mode;
const hbPlugin  = require('./webpack.hb-cdn-mount.plugin');

//CDN配置设置
const assetsCDN = {
  externals: {
    'vue': 'Vue',
    'vue-router': 'VueRouter',
    'vuex': 'Vuex',
    'axios': 'axios',
    'ant-design-vue': 'antd',
    'moment': 'moment'
  },
  css: [],
  js: [
    "https://cdn.bootcss.com/vue/2.6.11/vue.js",
    "https://cdn.bootcss.com/vuex/3.1.3/vuex.js",
    "https://cdn.bootcss.com/vue-router/3.1.3/vue-router.js",
    "https://cdn.bootcss.com/lodash.js/4.17.15/lodash.js",
    "https://cdn.bootcss.com/moment.js/2.24.0/moment.js",
    "https://cdn.bootcss.com/moment.js/2.24.0/locale/zh-cn.js",
    "https://cdn.bootcss.com/Sortable/1.10.1/Sortable.js",
    "https://cdn.bootcss.com/ant-design-vue/1.5.3/antd.js",
  ]
}

module.exports = {
  // pwa: { //favicon图标
  //   iconPaths: {
  //     favicon32: 'favicon.png',
  //     favicon16: 'favicon.png',
  //     appleTouchIcon: 'favicon.png',
  //     maskIcon: 'favicon.png',
  //     msTileImage: 'favicon.png'
  //   }
  // },

  configureWebpack: {
    plugins: [
      new hbPlugin({
        lib: process.env.lib_mode
      })
    ],
    externals: isProd ? assetsCDN.externals : {}
  },
  chainWebpack: (config) => {

    if (isProd) { //cdn配置
      config.plugin('html').tap(args => {
        if (args && args[0]) {
          args[0].cdn = assetsCDN
        }

        return args
      })
    }

    if (process.env.use_analyzer) { //打包分析
      config
        .plugin('webpack-bundle-analyzer')
        .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
    }

  },
  pluginOptions: {
    'style-resources-loader': { //LESS变量引入，每个component自动生效
      preProcessor: 'less',
      patterns: ["src/assets/styles/theme.less"]
    }
  },
  css: {
    loaderOptions: {
      less: {
        modifyVars: { //需要修改的变量

        },
        // do not remove this line
        javascriptEnabled: true
      }
    }
  },

}