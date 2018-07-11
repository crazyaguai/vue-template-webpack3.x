'use strict'

const path = require('path')

module.exports = {
    /**
     * 所有js入口
     * style为公共css入口，如reset等
     */
    js: [
        {
            name: 'style',
            path: path.resolve(__dirname, '..', 'src/scss/style.js')
        },
        {
            name: 'index',
            path: path.resolve(__dirname, '..', 'src/entry/index/index.js')
        },
        {
            name: 'market',
            path: path.resolve(__dirname, '..', 'src/entry/market/index.js')
        }
    ],
    /**
     * 所有html入口
     * from为原始文件地址
     * to为生成的文件名，可以加路径，比如'us/index-store.html'
     */
    html: [
        {
            from: path.resolve(__dirname, '..', 'src/entry/index.art'),
            to: 'index.html',
            chunkName: 'index'
        },
        {
            from: path.resolve(__dirname, '..', 'src/entry/index.art'),
            to: 'market.html',
            chunkName: 'market'
        }
    ]
}