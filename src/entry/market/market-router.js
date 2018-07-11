/* 路由配置 */
import Vue from 'vue'
import VueRouter from 'vue-router'

import store from './market-store'
import * as types from './market-store/types'

Vue.use(VueRouter)

import Market from '@/pages/market/market'

const router = new VueRouter({
    mode: 'hash',
    routes: [
        {
            path: '/',
            name: 'market-store',
            component: Market
        },
    ],

    /**
     * 滚动行为
     *
     */
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return {
                x: 0,
                y: 0
            }
        }
    }
})


/* 权限控制 */
router.beforeEach((to, from, next) => {
    return next()
})

export default router
