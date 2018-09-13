function $axios(options) {
    axios.prototype.$axios = $axios
    axios.defaults.baseURL = 'http://192.168.2.159:7002';
    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

    const [method, url, ...params] = options
    const [now_time, platform, ] = [parseInt(moment().unix()), 'web', ]
    const signObj = {
        now_time,
        platform,
    }
    Object.assign(signObj, ...params)
    console.log("签名对象=》", signObj)

    // 签名函数
    function getSign(option) {
        const [signList, key] = [
            [], '73c0030b13ceeff3994ebd59ff7530cd'
        ]

        function objKeySort(obj) { //排序的函数
            const newkey = Object.keys(obj).sort();　　 //先用Object内置类的keys方法获取要排序对象的属性名，再利用Array原型上的sort方法对获取的属性名进行排序，newkey是一个数组
            let newObj = {}; //创建一个新的对象，用于存放排好序的键值对
            for (let i = 0; i < newkey.length; i++) { //遍历newkey数组
                newObj[newkey[i]] = obj[newkey[i]]; //向新创建的对象中按照排好的顺序依次增加键值对
            }
            return newObj; //返回排好序的新对象
        }
        for (let i in objKeySort(option)) {
            signList.push(`${i}=${objKeySort(option)[i]}`)
        }
        console.log(signList.join('&') + '&key=' + key)
        return md5(signList.join('&') + '&key=' + key)
    }

    const sign = getSign(signObj) //调用签名函数获取签名
    const axiosconfig = {
        method,
        url,
        headers: {
            'Content-type': 'application/x-www-form-urlencoded'
        },
        transformRequest: [function(data) {
            let ret = ''
            for (let it in data) {
                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
            }
            return ret
        }],
        data: {
            ...signObj,
            sign,
        },
    }

}