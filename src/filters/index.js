import momoent from 'moment'
// import store from '@/store'
import Num from "@/common/number"

// export function timeFilter(value) {
//     if(value){
//         return momoent(value).utcOffset(store.state.timeZone).format('YYYY-MM-DD HH:mm:ss')
//     }else{
//         return '-'
//     }
// }

export function numFormat(num1, len) {
    return Num.format(num1, len)
}
export function numAdd(num1, num2, len) {
    return Num.add(num1, num2, len)
}
export function numMinus(num1, num2, len) {
    return Num.minus(num1, num2, len)
}
export function numMult(num1, num2, len) {
    return Num.mult(num1, num2, len)
}
export function numDiv(num1, num2, len) {
    return Num.div(num1, num2, len)
}
export function numMod(num1, num2, len) {
    return Num.mod(num1, num2, len)
}
