$(document).ready(function () {
  var giftsURL = '/gift-bag/index'
  var CDKEYURL = '/gift-bag-user-cdkey/index'
  var giftsData = ''
  //公共参数
  var ajaxObj = ajaxConfig()
  $.ajaxSetup({
    type: 'GET',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: ajaxObj.ajaxConfig,
  })

  //礼包列表游戏请求
  $.ajax({
    url: ajaxObj.baseURL + giftsURL,
    success: function (data) {
      if (data.data && data.data !== '') {
        remHTML(data.data)
        giftsData = data.data
      }
    },
    error: function (err) {
      console.log(err)
    },
  })


  //礼包列表HTML
  var remHTML = function (data) {
    var HTML = []
    data.map(function (item, index) {
      HTML.push(
        '<li class="flex-space-between new-game-li flex-align-items-center">' +
        ' <div class=" flexRow newgame-box ">' +
        '<div class="flex-all-center"><img src="../images/icon.png" alt="" class="new-game-imgicon-gifts"></div>' +
        '<div class="flex-column flex-justify-content-center ">' +
        '<div class="flex-space-between">' +
        '<span>' + item.game_name + '</span><span>' +
        '</div>' +
        '<div class="angleImg">' +
        '<img src="../images/angle.svg" alt="" >' +
        '<img src="../images/angle.svg" alt="">' +
        '<img src="../images/angle.svg" alt="">' +
        '<img src="../images/angle.svg" alt="">' +
        ' <img src="../images/angle.svg" alt="">' +
        '</div>' +
        '<div class="des ellipsis">三角合一</div>' +
        '</div>' +
        ' </div>' +
        '<button class="layui-btn  gifts-button"  data-index=' + index + ' data-toggle="modal" data-target="#myModal">领取礼包</button>' +
        '</li>'
      )

    })
    $('.libao-ul').html(HTML)
  }

  $(document).delegate(".libao-ul li .gifts-button", "click", function () {
    var giftsID = giftsData[$(this).attr('data-index')].gift_bag_id
    var giftsBag = giftsData[$(this).attr('data-index')].game_name
    console.log(giftsBag)
    var giftsconfig = giftsConfig(giftsID)
    $.ajaxSetup({
      type: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: giftsconfig.ajaxConfig,
    })

    $.ajax({
      url: giftsconfig.baseURL + CDKEYURL,
      success: function (data) {
        if (data.data && data.data !== '') {
          $('.js-libao-name').html(giftsBag)
        }
      },
      error: function (err) {
        console.log(err)
      },
    })
  });
})