'use strict'

const path = require('path')
const entries  = require('./entry-config')

module.exports = {
    dev: {

        // 路径
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        // 代理
        proxyTable: [
            {
                context: ['/manager', '/financeCheck', '/data'],
                target: 'http://192.168.168.121:8090/',
                // target: 'http://10.0.41.51:8090/',
                changeOrigin: true,
                logLevel: 'debug',
                // pathRewrite: {
                //     '^/api': ''
                // },
                // secure: false
            }
        ],

        // devServer选项
        host: '0.0.0.0', //
        port: 5000, //
        autoOpenBrowser: false, // 自动打开浏览器
        errorOverlay: true,
        notifyOnErrors: true,
        poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-


        /**
         * Source Maps
         */
        devtool: 'cheap-module-eval-source-map',

        // If you have problems debugging vue-files in devtools,
        // set this to false - it *may* help
        // https://vue-loader.vuejs.org/en/options.html#cachebusting
        cacheBusting: true,

        cssSourceMap: false
    },

    build: {
        // Template for index-store.html
        index: path.resolve(__dirname, '../dist/index-store.html'),

        // 路径
        assetsRoot: path.resolve(__dirname, '../dist'),
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',

        // 页面入口文件下，会自动检索下边所有html和js入口
        pageEntry: path.resolve(__dirname, '../src/pages'),



        minChunks: 3, // 公共包的最小引用数目
        /**
         * Source Maps
         */

        productionSourceMap: false,
        // https://webpack.js.org/configuration/devtool/#production
        devtool: '#source-map',

        base64Limit: 8192, // 超过这个数字，则转为base64资源

        // 模块分析，通过npm run build --report可以打开
        bundleAnalyzerReport: process.env.npm_config_report
    },
    // 外部引入的插件，在这里配置
    externals: {
        'QRCode':'QRCode'
    },
    entries: entries
}
