import Decimal from 'decimal.js-light'

Decimal.set({
  precision: 20,
  rounding: Decimal.ROUND_FLOOR,
  toExpNeg: -20,
  toExpPos: 21
});

export default {

    format(num, len) {
        if(len > 0){
            return new Decimal(num).toDecimalPlaces(len).toString()
        }else{
            return new Decimal(num).toString()
        }
    },

    add(num1, num2, len) {
        let a = new Decimal(num1)
        let b = new Decimal(num2)
        let c = a.plus(b)
        if(len > 0){
            return c.toDecimalPlaces(len).toString()
        }else{
            return c.toString()
        }
    },

    minus(num1, num2, len) {
        let a = new Decimal(num1)
        let b = new Decimal(num2)
        let c = a.minus(b)
        if(len > 0){
            return c.toDecimalPlaces(len).toString()
        }else{
            return c.toString()
        }
    },

    mult(num1, num2, len) {
        let a = new Decimal(num1)
        let b = new Decimal(num2)
        let c = a.times(b)
        if(len > 0){
            return c.toDecimalPlaces(len).toString()
        }else{
            return c.toString()
        }
    },

    div(num1, num2, len) {
        let a = new Decimal(num1)
        let b = new Decimal(num2)
        let c = a.dividedBy(b)
        if(len > 0){
            return c.toDecimalPlaces(len).toString()
        }else{
            return c.toString()
        }
    },

    mod(num1, num2, len) {
        let a = new Decimal(num1)
        let b = new Decimal(num2)
        let c = a.modulo(b)
        if(len > 0){
            return c.toDecimalPlaces(len).toString()
        }else{
            return c.toString()
        }
    }
}
