import Vue from 'vue'
import VueI18n from 'vue-i18n'

import enLocale from './en.json'
import zhLocale from './zh-CN.json'
import locale from './config'

Vue.use(VueI18n)

const messages = {
    en: {
        ...enLocale
    },
    'zh-CN': {
        ...zhLocale
    }
}

const i18n = new VueI18n({
    locale,
    messages
})



export default i18n
