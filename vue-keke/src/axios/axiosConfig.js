import axios from 'axios'; // 引入axios
import QS from 'qs'; // 引入qs模块，用来序列化post类型的数据，
import md5 from 'md5'
import moment from 'moment'

axios.defaults.timeout = 10000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.baseURL = 'http://192.168.2.159:7002';

function getSign(option) {
  var signList = [],
    key = '73c0030b13ceeff3994ebd59ff7530cd';

  function objKeySort(obj) {
    //排序的函数
    var newkey = Object.keys(obj).sort(); //先用Object内置类的keys方法获取要排序对象的属性名，再利用Array原型上的sort方法对获取的属性名进行排序，newkey是一个数组
    var newObj = {}; //创建一个新的对象，用于存放排好序的键值对
    for (var i = 0; i < newkey.length; i++) {
      //遍历newkey数组
      newObj[newkey[i]] = obj[newkey[i]]; //向新创建的对象中按照排好的顺序依次增加键值对
    }
    return newObj; //返回排好序的新对象
  }
  for (var i in objKeySort(option)) {
    signList.push(i + '=' + objKeySort(option)[i]);
  }
  return md5(signList.join('&') + '&key=' + key);
}

let [now_time, platform] = [parseInt(moment().unix()), 'web']
let signObj = {
  now_time,
  platform,
}
let sign = getSign(signObj)

const ajaxConfig = {
  platform,
  now_time,
  sign,
}
export default ajaxConfig


// /**
//  * get方法，对应get请求
//  * @param {String} url [请求的url地址]
//  * @param {Object} params [请求时携带的参数]
//  */
// export function get(url, params) {
//   return new Promise((resolve, reject) => {
//     axios.get(url, {
//       params: params
//     }).then(res => {
//       resolve(res.data);
//     }).catch(err => {
//       reject(err.data)
//     })
//   });
// }


// /** 
//  * post方法，对应post请求 
//  * @param {String} url [请求的url地址] 
//  * @param {Object} params [请求时携带的参数] 
//  */
// export function post(url, params) {
//   return new Promise((resolve, reject) => {
//     axios.post(url, QS.stringify(params))
//       .then(res => {
//         resolve(res.data);
//       })
//       .catch(err => {
//         reject(err.data)
//       })
//   });
// }
