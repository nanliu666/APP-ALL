
/**
 *反转有空格的字符串，超过5个长度，反转
 *示例 "Welcome" => "emocleW" 
 *     "Hey fellow warriors" => "Hey wollef sroirraw"
 * @param {*} str 需要处理的字符串
 * @returns 返回处理好的字符串
 */
const spinWords = function(str) {
  if (typeof (str) === 'string' && str.constructor === String) {
    //有空格
    if (str.indexOf(' ') !== -1) {
      if(str.length === 1) {
        return false
      }
      let newArr = []
      let strArr = str.split(" ")
      strArr.map((item, index) => {
        const itemLength = item.length
        if (itemLength < 5) {
          newArr.push(item)
        } else {
          newArr.push(str2Arr(item, '', ''))
        }
      })
      return newArr.join(" ")
    } else {
      // 没有空格
      if(str.length > 5) {
        return str2Arr(str, '' , '')
      } else {
        return str
      }
    }
  }
}