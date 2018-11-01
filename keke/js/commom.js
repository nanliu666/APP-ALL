  //designWidth:设计稿的实际宽度值，需要根据实际设置
  //maxWidth:制作稿的最大宽度值，需要根据实际设置
  //这段js的最后面有两个参数记得要设置，一个为设计稿实际宽度，一个为制作稿最大宽度，例如设计稿为750，最大宽度为750，则为(750,750)
  (function (designWidth, maxWidth) {
    var doc = document,
      win = window,
      docEl = doc.documentElement,
      remStyle = document.createElement("style"),
      tid;

    function refreshRem() {
      var width = docEl.getBoundingClientRect().width;
      maxWidth = maxWidth || 540;
      width > maxWidth && (width = maxWidth);
      var rem = width * 100 / designWidth;
      remStyle.innerHTML = 'html{font-size:' + rem + 'px;}';
    }

    if (docEl.firstElementChild) {
      docEl.firstElementChild.appendChild(remStyle);
    } else {
      var wrap = doc.createElement("div");
      wrap.appendChild(remStyle);
      doc.write(wrap.innerHTML);
      wrap = null;
    }
    //要等 wiewport 设置好后才能执行 refreshRem，不然 refreshRem 会执行2次；
    refreshRem();

    win.addEventListener("resize", function () {
      clearTimeout(tid); //防止执行两次
      tid = setTimeout(refreshRem, 300);
    }, false);

    win.addEventListener("pageshow", function (e) {
      if (e.persisted) { // 浏览器后退的时候重新计算
        clearTimeout(tid);
        tid = setTimeout(refreshRem, 300);
      }
    }, false);

    if (doc.readyState === "complete") {
      doc.body.style.fontSize = "16px";
    } else {
      doc.addEventListener("DOMContentLoaded", function (e) {
        doc.body.style.fontSize = "16px";
      }, false);
    }
  })(750, 750);


  layui.use(['carousel', 'element', ], function () {
    var carousel = layui.carousel;
    var element = layui.element;
    //建造实例
    carousel.render({
      elem: '#carousel',
      width: '100%', //设置容器宽度,
      height: "200px",
      arrow: 'none', //始终显示箭头
      anim: 'fade', //切换动画方式
      interval: '3000', //切换动画方式
      arrow: "hover",
    });
    //获取hash来切换选项卡，假设当前地址的hash为lay-id对应的值
    var layid = location.hash.replace(/^#test1=/, '');
    element.tabChange('test1', layid);
  });

  $('.navbar').on('click', 'li', function () {
    $(this).addClass('actives').siblings().removeClass('actives')
  })

  // 游戏页面的
  $('.js-downLeft').on('click', function () {
    $(".js-display").toggle();
  })



  //ajax请求公共参数配置
  var ajaxConfig = function () {
    baseURL = 'http://192.168.2.159:7002'
    signObj = {
      now_time: parseInt(moment().unix()),
      platform: 'web'
    }
    sign = getSign(signObj)

    ajaxConfig = {
      platform: 'web',
      now_time: parseInt(moment().unix()),
      sign: getSign(signObj),
    }

    var obj = {
      baseURL: baseURL,
      ajaxConfig: ajaxConfig,
    }
    return obj
  }

  // 礼包ajax设置另外设置
  var giftsConfig = function (giftsID) {
    baseURL = 'http://192.168.2.159:7002'
    signObj = {
      now_time: parseInt(moment().unix()),
      platform: 'web',
      gift_bag_id	: giftsID
    }
    sign = getSign(signObj)

    ajaxConfig = {
      platform: 'web',
      now_time: parseInt(moment().unix()),
      gift_bag_id	: giftsID,
      sign: getSign(signObj),
    }

    var obj = {
      baseURL: baseURL,
      ajaxConfig: ajaxConfig,
    }
    return obj
  }