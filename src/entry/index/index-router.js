/* 路由配置 */
import Vue from 'vue'
import VueRouter from 'vue-router'

import store from './index-store/index'
import * as types from './index-store/types'

Vue.use(VueRouter)

import Index from '@/pages/index/index'

const router = new VueRouter({
    mode: 'hash',
    routes: [
        {
            path: '/',
            name: 'index',
            component: Index
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
