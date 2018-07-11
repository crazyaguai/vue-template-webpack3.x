let language = 'en'

if (navigator.language) {
    language = navigator.language
} else if (navigator.browserLanguage) {
    language = navigator.browserLanguage
}

language = language.toLowerCase()

/**
 * 目前支持两种语言
 * 1. 如果是中文则显示zh-ch
 * 2. 其他情况均采用en
 * */
if (language.indexOf('zh') === 0) {
    language = 'zh'
} else {
    language = 'en'
}

try {
    language = window.localStorage.getItem('lang') || language
} catch (error) {
    language = 'en'
}

export default language
