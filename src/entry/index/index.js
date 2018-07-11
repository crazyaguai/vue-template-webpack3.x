/**
 * 入口文件
 */
import '../../scss/index.scss'

import Vue from 'vue'
import 'babel-polyfill'
import Index from './Index.vue'
import router from './index-router.js'
import i18n from '@/lang/index'
import store from './index-store'
import * as filters from '@/filters'

Object.keys(filters).forEach(filterName => {
    Vue.filter(filterName, filters[filterName])
})


// 主界面
new Vue({
    mounted() {
        /* remove loading */
        let loadingNode = document.getElementById('fs-loading')
        if (loadingNode) {

            loadingNode.parentNode.removeChild(loadingNode)
        }
    },
    render(h) {
        return h(Index)
    },
    router,
    i18n,
    store

}).$mount('#app')


