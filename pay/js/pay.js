$(function() {
    // 1.进入时请求拿到需要付款的商品信息name,price,渲染页面
    // 拿到参数的对象
    var params = Utils.getDataByUrl();

    // 一进来判断安卓还是ios
    var isAndroid = (params["type"] == "Android");
    // 支付状态
    var status;

    // 给安卓来调用的方法
    function payResult(payStatus) {
        // $(".payLoading,.success,.failed,.payNot").css("display", "none");
        $(".payLoading").css("display", "none");
        $(".success").css("display", "none");
        $(".failed").css("display", "none");
        $(".payNot").css("display", "none");
        status = parseInt(payStatus);
        if (payStatus === 0) {
            $(".priceInfo").css("display", "block");
            $(".failed").css("display", "block");
        } else if (payStatus === 1) {
            $(".priceInfo").css("display", "block");
            $(".success").css("display", "block");
        } else if (payStatus === 2) {
            $(".priceInfo").css("visibility", "hidden");
            $(".payNot").css("display", "block");
        }
    }
    window.payResult = payResult;
    // $(".priceInfo>ul").append("<li class='clearfix'><span class='left'>" + params.product_desc + "</span><div class='right'>￥" + Utils.toMoney(params.amount) + "</div></li>");
    //动态生成商品信息
    $(".priceInfo>ul").html(`<li class='clearfix'>
                                <span class='left'>${params.product_desc}</span>
                                <div class='right'>￥${Utils.toMoney(params.amount)}</div>
                            </li>`);

    // 渲染客服信息
    $(".serviceqq").text(params.serviceqq)
    $(".servicemail").text(decodeURIComponent(params.servicemail))

    // 2.假设进入时,默认是微信支付,用参数way 0,1,2 分别标识 微信支付 支付宝支付 银联支付
    var way = "WECHATPAY";
    $(".JsClick").on("click", function() {
        var index = $(this)
            .parent()
            .index();
        $(this)
            .find('.selImg')
            .addClass("s2")
            .parent()
            .siblings()
            .children(".selImg")
            .removeClass("s2");
        switch (index) {
            case 0:
                way = "WECHATPAY";
                break;
            case 1:
                way = "ALIPAY";
                break;
            case 2:
                way = "UNIONPAY";
                break;
        }
    });

    // 支付
    // 3.进来点击支付，把支付商品的信息传参给后台（接口1），拿到url，跳转这个url
    $(".payNow").on("click", function() {
        // $(".payPage").css("display", "none");
        // $(".payStatusPage").css("display", "block");
        // $(".payLoading").css("display", "block");
        // 3.0.1 判断用户是否安装微信

        // 让按钮支付完成按钮5s内不可点，字体变灰色
        $(".payFinish").attr('disabled', true).css('color', '#bfbfbf')
        setTimeout(function() {
            $(".payFinish").attr('disabled', false).css('color', '#ffffff')
        }, 3000);

        if (params.iswxinstalled == 1) {
            if (isAndroid) {
                fee.cocoPay(way);
            } else {
                window.webkit.messageHandlers.cocoPay.postMessage(way)
            }
            $(".payPage").css("display", "none");
            $(".payStatusPage").css("display", "block");
            $(".payLoading").css("display", "block");
        } else {
            if (isAndroid) {
                fee.enAlert("微信未安装,请先安装微信");
            } else {
                window.webkit.messageHandlers.enAlert.postMessage("微信未安装,请先安装微信")
            }
        }

        // console.log(way);
        // 判断参数是否存在
        // params.appid && params.channel && params.sign
        // if (params.appid && params.channel && params.sign) {
        //   $.ajax({
        //     url: "http://api.test.coco.gzzhongw.net/payment/pay/order",
        //     type: "post",
        //     dataType: "json",
        //     data: {
        //       // appid: params.appid,
        //       // channel: params.channel,
        //       // sign: params.sign,
        //       // test: 'debug'
        //       appid: 10001,
        //       channel: 1,
        //       sign: 111,
        //       test: "debug"
        //     },
        //     success: function (res) {
        //       // 判断支付结果 根据结果渲染页面
        //       // fee.enWX() 调起微信
        //       // fee.checkWeichat() 检查微信支付状态
        //       // fee.closePay('2') 关闭窗口，返回游戏
        //       // 把拿到的订单号给安卓
        //       // fee.enWX('1111')
        //       var json = JSON.stringify(res.data);
        //       // 调用微信
        //       fee.enWX(json);
        // $(".payPage").css("display", "none");
        // $(".payStatusPage").css("display", "block");
        //     }
        //   });
        // }
    });

    // 4.联系客服
    $(".payPage .payQue").on("click", function() {
        $(".payPage").css("display", "none");
        $(".cusService").css("display", "block");
    });

    // 支付状态的js 
    // 1.0.1 支付完成,调用安卓的接口，拿到支付结果，判断支付状态
    $(".payFinish").on("click", function() {
        // 1.0.2 调用安卓的方法 支付完成
        $(".payLoading").css("display", "none");
        if (isAndroid) {
            fee.checkWeichat(way);
        } else {
            window.webkit.messageHandlers.checkWeichat.postMessage(way)
        }

    });
    // 2.0.1 返回游戏
    $(".payStatusPage .btn").on("click", function() {
        // 2.0.1 调用安卓的方法  window.别名.android中的方法名(parameter Values)
        if (isAndroid) {
            fee.closePay(status);
        } else {
            window.webkit.messageHandlers.closePay.postMessage(status)
        }
    });

    // 3.0.1 联系客服
    $(".payStatusPage .payQue").on("click", function() {
        // 3.0.1 到时候把跳转换成域名
        $(".payStatusPage").css("display", "none");
        $(".cusService").css("display", "block");
    });

    // 客服页面
    $(".toBack").on("click", function() {
        // 根据支付状态返回不同的页面
        $(".cusService").css('display', 'none')
        if (status === 0) {
            $(".payStatusPage,.failed").css("display", "block");
        } else if (status === 2) {
            $(".payStatusPage,.payNot").css("display", "block");
        } else {
            $(".payStatusPage,.payPage").css("display", "block");
        }
        // if (isAndroid) {
        //   fee.closePay(status);
        // } else {
        //   window.webkit.messageHandlers.closePay.postMessage(status)
        //   window.history.back();
        // }
    }); //*/
})