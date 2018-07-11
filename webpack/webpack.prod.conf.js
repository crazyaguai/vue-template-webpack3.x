'use strict'
const path = require('path')
const utils = require('./utils')
const webpack = require('webpack')
const config = require('./config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')



const webpackConfig = merge(baseWebpackConfig, {
    module: {
        rules: utils.styleLoaders({
            sourceMap: config.build.productionSourceMap,
            extract: true,
            usePostCSS: true
        })
    },
    devtool: config.build.productionSourceMap ? config.build.devtool : false,
    output: {
        path: config.build.assetsRoot,
        filename: utils.assetsPath('js/[name].[chunkhash:8].js'),
        chunkFilename: utils.assetsPath('js/[name].[chunkhash:8].js')
    },
    externals: config.build.externals,
    plugins: [
        // http://vuejs.github.io/vue-loader/en/workflow/production.html
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.DllReferencePlugin({
            context: path.resolve(__dirname, '../'), // 根路径
            manifest: require('./baseVendor-manifest.json'),
        }),
        new webpack.DllReferencePlugin({
            context: path.resolve(__dirname, '../'), // 根路径
            manifest: require('./vueVendor-manifest.json'),
        }),
        // 压缩JS
        new UglifyJsPlugin({
            uglifyOptions: {
                compress: {
                    warnings: false
                }
            },
            sourceMap: config.build.productionSourceMap,
            parallel: true
        }),
        // 提取CSS，有多少个entry引入css就有多少个css文件被分离出来
        new ExtractTextPlugin({
            filename: utils.assetsPath('css/[name].[contenthash:8].css'),
            allChunks: false, // 是否提取所有的
        }),
        // Compress extracted CSS. We are using this plugin so that possible
        // duplicated CSS from different components can be deduped.
        new OptimizeCSSPlugin({
            cssProcessorOptions: config.build.productionSourceMap ? {
                safe: true,
                map: {
                    inline: false
                }
            } : {
                safe: true
            }
        }),
        // 保持chunkId不变
        new webpack.NamedChunksPlugin(),
        // 保持moduleID稳定
        new webpack.HashedModuleIdsPlugin(),
        // 提升作用域
        new webpack.optimize.ModuleConcatenationPlugin(),

        // 打包vendor(不在baseVendor中的内容)
        new webpack.optimize.CommonsChunkPlugin({
          name: 'vendor',
          minChunks (module) {
            // any required modules inside node_modules are extracted to vendor
            return (
              module.resource &&
              /\.js$/.test(module.resource) && module.resource.indexOf(
                    path.join(__dirname, '../node_modules')) === 0
            )
          }
        }),

        new webpack.optimize.CommonsChunkPlugin({
            name: 'commonChunk',
            minChunks: function (module, count) {
                // 保证commonChunk中的内容都是js且是scr下面调用的
                return (
                    module.resource && /\.js$/.test(module.resource) &&
                    module.resource.indexOf(
                        path.join(__dirname, '../src')
                    ) === 0 && count >= config.build.minChunks
                )
            }
        }),
        // webpackComonsChunk的执行环境，包含module的映射信息，会经常变化
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest',
            minChunks: Infinity
        }),


        // 复制static中的内容
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

const htmlEntries = config.entries.html.map(htmlEntry => {
    return new HtmlWebpackPlugin({
        filename: htmlEntry.to,
        template: htmlEntry.from,
        inject: false,
        env: 'production',
        chunkName: htmlEntry.chunkName,
        minify: {
            removeComments: true,
            collapseWhitespace: true,
            removeAttributeQuotes: false,
            minifyCSS: true,
            minifyJS: true
            // more options:
            // https://github.com/kangax/html-minifier#options-quick-reference
        },
        // necessary to consistently work with multiple chunks via CommonsChunkPlugin
        chunksSortMode: 'dependency'
    })
})

webpackConfig.plugins.push(...htmlEntries)

// 如果带--report参数，则分析模块
if (config.build.bundleAnalyzerReport) {
    const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
    webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig
