'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('./config')
const merge = require('webpack-merge')
const path = require('path')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
// const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')

const HOST = process.env.HOST || config.dev.host
const PORT = process.env.PORT && Number(process.env.PORT) || config.dev.port

const devWebpackConfig = merge(baseWebpackConfig, {
    module: {
        rules: utils.styleLoaders({
            sourceMap: config.dev.cssSourceMap,
            usePostCSS: true,
            extract: false
        })
    },
    devtool: config.dev.devtool,

    // devServer 配置，大部分在config中
    devServer: {
        clientLogLevel: 'warning',

        hot: true,
        contentBase: false, // 使用CopyWebpackPlugin, 所以这里不需要
        compress: true,
        host: HOST,
        port: PORT,
        open: config.dev.autoOpenBrowser,
        overlay: config.dev.errorOverlay ?
            {
                warnings: false,
                errors: true
            } :
            false, // 是否显示编译错误
        publicPath: config.dev.assetsPublicPath,
        proxy: config.dev.proxyTable,
        quiet: true, // 使用FriendlyErrorsPlugin报错，所以把原生的报错关了
        watchOptions: {
            poll: config.dev.poll,
        }
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"dev"',
            },
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
        new webpack.NoEmitOnErrorsPlugin(),
        // // 提取CSS，有多少个entry引入css就有多少个css文件被分离出来
        // new ExtractTextPlugin({
        //     filename: utils.assetsPath('css/[name].css'),
        //     allChunks: false, // 是否提取所有的
        // }),

        new webpack.DllReferencePlugin({
            context: path.resolve(__dirname, '../'), // 根路径
            manifest: require('./baseVendor-manifest.json'),
        }),

        // 把static中的内容copy到内存中
        new CopyWebpackPlugin([{
            from: path.resolve(__dirname, '../static'),
            to: `${config.build.assetsSubDirectory}`,
            ignore: ['.*']
        }, {
            from: path.resolve(__dirname, '../favicon.ico'),
            to: ''
        }])
    ]
})

// html入口
// https://github.com/ampedandwired/html-webpack-plugin
const htmlEntries =  config.entries.html.map(htmlEntry => {
    return new HtmlWebpackPlugin({
        filename: htmlEntry.to,
        template: htmlEntry.from,
        chunkName: htmlEntry.chunkName,
        inject: false,
        env: 'dev'
    })
})

devWebpackConfig.plugins.push(...htmlEntries)



if (process.env.PERMISION_ENV) {
    devWebpackConfig.devServer.port = PORT + 80
    const fs = require('fs')
    devWebpackConfig.devServer.before = app => {
        app.all('/manager/roleManager/menu-admin-list', (req, res) => {
            const fileContent = fs.readFileSync(path.resolve(__dirname, '../src/routes/menuList.js'), {encoding: 'utf-8'})

            let json = eval(fileContent)
            res.json(json)
        })
    }
}



// 前面一串是为了找在port被占用的情况下，自动找一个没被占用的
module.exports = new Promise((resolve, reject) => {
    portfinder.basePort = devWebpackConfig.devServer.port
    portfinder.getPort((err, port) => {
        if (err) {
            reject(err)
        } else {
            // publish the new Port, necessary for e2e tests
            process.env.PORT = port
            // add port to devServer config
            devWebpackConfig.devServer.port = port

            // Add FriendlyErrorsPlugin
            devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
                compilationSuccessInfo: {
                    messages: [`开发地址: http://${devWebpackConfig.devServer.host}:${port}`],
                },
                onErrors: config.dev.notifyOnErrors ?
                    utils.createNotifierCallback() :
                    undefined
            }))

            resolve(devWebpackConfig)
        }
    })
})
