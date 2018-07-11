const langOptions = [
    {
        label: '中文',
        value: 'zh-CN',
        headerLang: 'zh-CN',
        pattern: /^zh/
    },
    {
        label: 'English',
        value: 'en',
        headerLang: 'en-US',
        pattern: /^en/
    }
]
/**
 * 以下代码获取默认语言
 */
const DEFAULT_LANG = langOptions[0].value
let lang = window.localStorage.getItem('lang') || window.navigator.language || DEFAULT_LANG

let matchedLang = langOptions.find(item => {
    return item.pattern.test(lang)
})
if (matchedLang) {
    lang = matchedLang.value
} else {
    lang = DEFAULT_LANG
}


export {
    lang as default,
    langOptions
}

