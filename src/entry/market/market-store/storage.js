export function setItem(key, value) {
    window.localStorage.setItem(key, JSON.stringify(value))
}

export function getItem(key) {
    let result = window.localStorage.getItem(key)
    try {
        result = JSON.parse(result)
    } catch (error) {
        result = undefined
    }
    return result
}
export function removeItem(key) {
    window.localStorage.removeItem(key)
}
export function clear() {
    window.localStorage.clear()
}
