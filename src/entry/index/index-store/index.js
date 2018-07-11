/**
 * 存储所有全局状态
 */

import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations'
import getters from './getters'
import actions from './actions'
import lang from '@/lang/config'
import {getItem} from './storage'


Vue.use(Vuex)

const store = new Vuex.Store({

    state: {
    },

    mutations,
    getters,
    actions,

    strict: process.env.NODE_ENV !== 'production'

})

export default store
