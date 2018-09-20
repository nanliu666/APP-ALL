/**
 *获取axios中GET方法的参数
 *
 * @param {*}  不需要传参
 * @returns axiosconfig  外界统一调用这个参数列表
 */
function $axiosGetConfig(params) {

    axios.defaults.baseURL = 'http://192.168.2.159:7002';
    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    const [now_time, platform, ] = [parseInt(moment().unix()), 'web', ]
    let signObj = {
        now_time,
        platform,
    }

    if (!!params) { // 传参
        // 签名参数处理
        Object.assign(signObj, { recruit_type_id: params.recruit_type_id })
    } else {
        signObj = signObj
    }

    const sign = getSign(signObj) //调用签名函数获取签名
    let axiosconfig = {
        method: "GET",
        headers: {
            'Content-type': 'application/x-www-form-urlencoded'
        },
        params: {
            now_time,
            platform,
            sign,
        },
    }

    // 处理传递参数新增时处理
    axiosconfig.params = !!params ? Object.assign(axiosconfig.params, { recruit_type_id: params.recruit_type_id }) : axiosconfig.params

    /**
     *获取签名函数
     *
     * @param {*} option 
     * @returns 返回签名md5
     */
    function getSign(option) {
        const [signList, key] = [
            [], '73c0030b13ceeff3994ebd59ff7530cd'
        ]

        /**
         *
         *排序对象
         * @param {*} obj 对对象的属性排序
         * @returns 返回排序好的对象
         */
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



    return axiosconfig
}