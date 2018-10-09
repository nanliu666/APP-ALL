/**
 *数字处理，返回可以被整除的所有数
 *divisors(15), [3, 5]
 * @param {*} number
 * @returns 返回一个数组或者说明是质数
 */
const divisors = function (number) {
  if (Number.isInteger(number) === false) return false //整数判断
  if (number <= 1) return false // 大于1判断
  if (isPrimeNum(number) === true) { //质数判断
    return number + ' is prime'
  } else {
    let result = []
    let getIntegerTimesARR = []
    for(let i = 2 ; i < number; i++) {
      getIntegerTimesARR.push( getIntegerTimes(number, i))
    }
    getIntegerTimesARR.map(item => {
      if(Number.isInteger(item) === true) {
        result.unshift(item)
      }
    })
    return result
  }
}