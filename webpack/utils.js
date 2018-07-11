'use strict'
const path = require('path')
const config = require('./config')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const packageConfig = require('../package.json')
const fs = require('fs')

// 资源输出路径函数，方便其他地方调用
exports.assetsPath = function (_path) {
    const assetsSubDirectory = process.env.NODE_ENV === 'production' ?
        config.build.assetsSubDirectory :
        config.dev.assetsSubDirectory

    return path.posix.join(assetsSubDirectory, _path)
}

/**
 * 格式化cssloader, 支持所有sass、scss、less、stylus等，需要手动安装dev依赖
 *
 * @param {*} options
 * options = {
 *  sourceMap: true, // 是否开启css的sourceMap
 *  extract: true, // 是否提取css到独立的文件
 *  usePostCSS: true // 是否使用PostCss
 * }
 */
exports.cssLoaders = function (options) {
    options = options || {}

    const cssLoader = {
        loader: 'css-loader',
        options: {
            sourceMap: options.sourceMap
        }
    }

    const postcssLoader = {
        loader: 'postcss-loader',
        options: {
            sourceMap: options.sourceMap
        }
    }

    // generate loader string to be used with extract text plugin
    function generateLoaders(loader, loaderOptions) {
        const loaders = options.usePostCSS ? [cssLoader, postcssLoader] : [cssLoader]

        if (loader) {
            loaders.push({
                loader: loader + '-loader',
                options: Object.assign({}, loaderOptions, {
                    sourceMap: options.sourceMap
                })
            })
        }

        // Extract CSS when that option is specified
        // (which is the case during production build)
        if (options.extract) {
            return ExtractTextPlugin.extract({
                use: loaders,
                fallback: 'vue-style-loader'
            })
        } else {
            return ['vue-style-loader'].concat(loaders)
        }
    }

    return {
        css: generateLoaders(),
        postcss: generateLoaders(),
        less: generateLoaders('less'),
        sass: generateLoaders('sass', {
            indentedSyntax: true
        }),
        scss: generateLoaders('sass'),
        stylus: generateLoaders('stylus'),
        styl: generateLoaders('stylus')
    }
}

//  各种style的处理
exports.styleLoaders = function (options) {
    const output = []
    const loaders = exports.cssLoaders(options)

    for (const extension in loaders) {
        const loader = loaders[extension]
        output.push({
            test: new RegExp('\\.' + extension + '$'),
            use: loader
        })
    }

    return output
}

// 错误提示信息
exports.createNotifierCallback = () => {
    const notifier = require('node-notifier')

    return (severity, errors) => {
        if (severity !== 'error') return
        // console.log(errors)
        const error = errors[0]
        const filename = error.file && error.file.split('!').pop()

        notifier.notify({
            title: packageConfig.name,
            message: severity + ': ' + error.name,
            subtitle: filename || '',
            //   icon: path.join(__dirname, 'logo.png')
        })
    }
}

// 获取所有入口信息，即src/pages下的页面
const getEntries = (startPath) => {
    let result = {
        html: [],
        js: []
    }
    let isHtmlEntry = (name, fileName) => {
        let arr = ['.art', '.html', '.ejs'].map(value => {
            return `${name}${value}`
        })

        return arr.includes(fileName)
    }
    let isJSEntry = (name, fileName) => {
        let arr = ['.js'].map(value => {
            return `${name}${value}`
        })

        return arr.includes(fileName)
    }
    // 页面入口下的所有文件夹
    let directories = fs.readdirSync(startPath)
    directories.forEach(directory => {
        let directoryPath = path.join(startPath, directory)
        let stats = fs.statSync(directoryPath)
        if (stats.isDirectory()) {
            let files = fs.readdirSync(directoryPath)
            // home.art、home.js等文件处理
            files.forEach(file => {
                let filePath = path.join(directoryPath, file)
                let fileStat = fs.statSync(filePath)
                if (fileStat.isFile()) {
                    if (isHtmlEntry(directory, file)) {
                        result.html.push({
                            name: directory,
                            path: filePath
                        })
                    } else if (isJSEntry(directory, file)) {
                        result.js.push({
                            name: directory,
                            path: filePath
                        })
                    }
                }
            })
        }
    })

    return result
}

// let entries = getEntries(config.build.pageEntry)

// 暂时不使用，没有这么多入口
// exports.entries = entries
