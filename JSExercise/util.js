/**
 *字符串反转
 *str2Arr("kongxiangrun") => nurgnaixgnok
 * @param {*} str 传入数组
 * @param {*} separator1 字符串分割符合默认''
 * @param {*} separator2 要变成什么的分割符号 默认''
 * @returns
 */
const str2Arr = function (str, separator1 = '', separator2 = '') {
  return str.split(separator1).reverse().join(separator2)
}

/**
 *判断是不是质数
 *isPrimeNum(11) => true
 * @param {*} num
 * @returns true是质数，false不是质数
 */
const isPrimeNum = function (num) {
  return !/^.?$|^(..+?)\1+$/.test(Array(num + 1).join('1'))
}


/**
 *示例 getIntegerTimes(15, 3) => 5
 *获得两个数能否被整除
 * @param {*} arg1 除数
 * @param {*} arg2 被除数
 * @returns 返回除的结果
 */
const getIntegerTimes = function (arg1, arg2) {
  if (arg1 < arg2) {
    var flag = arg1;
    arg1 = arg2;
    arg2 = arg1;
  }
  var t1 = 0,
    t2 = 0,
    r1, r2;
  try {
    t1 = arg1.toString().split(".")[1].length
  } catch (e) {}
  try {
    t2 = arg2.toString().split(".")[1].length
  } catch (e) {}
  with(Math) {
    r1 = Number(arg1.toString().replace(".", ""));
    r2 = Number(arg2.toString().replace(".", ""));
    return (r1 / r2) * pow(10, t2 - t1);
  }
}
/**
 *检查倍数是正还是负
 *示例 isPositiveIntegerTimes(-5) false
 * @param {*} arg 一个正负数
 * @returns 正数返回true 负数返回false
 */
const isPositiveIntegerTimes = function (arg) {
  var num = arg.toString();
  if (!(/(^[1-9]\d*$)/.test(num))) {
    return false;
  } else {
    return true;
  }
}