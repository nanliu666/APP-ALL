'use strict';

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