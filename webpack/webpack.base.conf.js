'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('./config');
const vueLoaderConfig = require('./vue-loader.conf');
const webpack = require('webpack')

// 从工作目录下找路径
function resolve(dir) {
    return path.join(__dirname, '..', dir)
}

const entries = {}
// 所有js入口
config.entries.js.forEach(jsEntry => {
    entries[jsEntry.name] = jsEntry.path
})

// 所有资源，开发环境不加hash，生产环境加hash
let assetName = process.env.NODE_ENV === 'production' ? '[name].[hash:6].[ext]' : '[name].[ext]'


module.exports = {
    context: path.resolve(__dirname, '../'), // 根路径
    //   entry: {
    //     app: './src/main.js'
    //   },
    entry: entries,
    output: {
        path: config.build.assetsRoot,
        filename: '[name].js',
        publicPath: process.env.NODE_ENV === 'production' ?
            config.build.assetsPublicPath : config.dev.assetsPublicPath
    },
    resolve: {
        extensions: ['.js', '.json', '.vue'],
        alias: {
            '@': resolve('src'),
            '^': resolve('static'),
            'img': resolve('src/img'),
            'vue$': 'vue/dist/vue.esm.js',
        }
    },
    externals: config.externals,
    module: {
        rules: [
            {
                test: /\.art$/,
                loader: 'art-template-loader',
                options: {
                    htmlResourceRules: false,
                    cache: false,
                    minimize: false,
                    compileDebug: false,
                }
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [resolve('src'), resolve('node_modules/webpack-dev-server/client')]
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: vueLoaderConfig
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: config.build.base64Limit,
                    name: utils.assetsPath(`img/${assetName}`)
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: config.build.base64Limit,
                    name: utils.assetsPath(`media/${assetName}`)
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: config.build.base64Limit,
                    name: utils.assetsPath(`fonts/${assetName}`)
                }
            }
        ]
    },
    node: {
        // prevent webpack from injecting useless setImmediate polyfill because Vue
        // source contains it (although only uses it if it's native).
        setImmediate: false,
        // prevent webpack from injecting mocks to Node native modules
        // that does not make sense for the client
        dgram: 'empty',
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
        child_process: 'empty'
    },
    plugins: [
        /* 忽略moment的本地文件 */
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
    ]
}
