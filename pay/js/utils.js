var Utils = {
    // 判断安卓和ios
    isAndroid_ios: function () {
        var u = navigator.userAgent,
            app = navigator.appVersion;
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端或者uc浏览器
        var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        return isAndroid == true ? true : false;
    },
    // 从url中获取参数
    getDataByUrl: function () {
        var arr = window.location.search.slice(1).split("&");
        var obj = {};
        for (var i = 0; i < arr.length; i++) {
            var item = arr[i].split("=");
            obj[item[0]] = decodeURI(item[1]);
        }
        return obj;
    },
    // 金钱的换行格式
    toMoney: function (money) {
        var str = (money / 100).toFixed(2) + "";
        var intSum = str
            .substring(0, str.indexOf("."))
            .replace(/\B(?=(?:\d{3})+$)/g, ","); //取到整数部分
        var dot = str.substring(str.length, str.indexOf(".")); //取到小数部分
        return intSum + dot;
    },
}