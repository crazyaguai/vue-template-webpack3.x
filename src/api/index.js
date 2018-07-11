import axios from 'axios'
import store from '@/store'
import * as types from '../entry/index/index-store/types'
import i18n from '@/lang'

import {langOptions} from '../lang/config'
const NO_LOGIN_CODE = 'TOKE_HAS_INVALID'
const baseURL = '/manager'

/**
 * 返回错误统一处理，只传递正确状态码的返回数据
 * 网络错误和状态码不正确的情况下，返回 false
 */
axios.interceptors.response.use(rep => {
    /* 跳转到登录 */
    return rep.data

}, err => {
    // store.commit(types.PUSH_ERR_MSG, i18n.t('网络错误'))
    return false
})

function stringify(obj) {
    let arr = []
    Object.keys(obj).forEach(key => {
        arr.push(`${key}=${encodeURIComponent(obj[key])}`)
    })
    return arr.join(',')
}

function getAuthHeader(header) {
    let headerLang = store.state.lang
    let matchedLang = langOptions.find(item => {
        return item.pattern.test(headerLang)
    })

    headerLang = matchedLang.headerLang

    return {
        'accept-language': headerLang,
        authorization: stringify({
            token: store.state.token,
            ...header
        })
    }
}


export default {
    get(url, param = {}, headers = {}, notUseBaseURL = false) {
        return axios.get(url, {
            baseURL: notUseBaseURL ? '' : baseURL,
            params: param,
            headers: getAuthHeader(headers)
        })
    },
    post(url, param = null, headers = {}, notUseBaseURL = false) {
        return axios.post(url, param, {
            baseURL: notUseBaseURL ? '' : baseURL,
            headers: getAuthHeader(headers)
        })
    }
}
