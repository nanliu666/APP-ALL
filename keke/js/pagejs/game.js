$(document).ready(function () {
  //index 页面ajax 
  var newSortUrl = '/game/new-sort'
  var IndexUrl = '/game-server/index'
  var recommendURL = '/game/recommend'
  var CDKEYURL = '/gift-bag-user-cdkey/index'

  var remData = ''
  var gameServerData = ''
  var newGameData = ''
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

  //推荐游戏请求
  $.ajax({
    url: ajaxObj.baseURL + recommendURL,
    success: function (data) {
      if (data.data && data.data !== '') {
        remHTML(data.data)
        remData = data.data
      }
    },
    error: function (err) {
      console.log(err)
    },
  })
  // 新游请求
  $.ajax({
    url: ajaxObj.baseURL + newSortUrl,
    success: function (data) {
      if (data.data && data.data !== '') {
        newSortUrlHTML(data.data)
        newGameData = data.data
      }
    },
    error: function (err) {
      console.log(err)
    },
  })
  // 开服请求
  $.ajax({
    url: ajaxObj.baseURL + IndexUrl,
    success: function (data) {
      if (data.data && data.data !== '') {
        gameServerHTML(data.data)
        gameServerData = data.data
      }
    },
    error: function (err) {
      console.log(err)
    },
  })


  //推荐游戏HTML
  var remHTML = function (data) {
    var HTML = []
    data.map(function (item, index) {
      HTML.push(
        '<li class="flexRow flex-align-items-center remLi" data-toggle="modal" data-target="#myModal">' +
        '<img src="../images/icon.png" alt="">' +
        '<div class="flex-column width80">' +
        '<div class="flex-space-between">' +
        '<div>' + item.name + '</div>' +
        '<img src="../images/free.png" class="freeImg" alt="">' +
        '</div>' +
        '<div class="angleImg">' +
        '<img src="../images/angle.svg" alt="">' +
        '<img src="../images/angle.svg" alt="">' +
        '<img src="../images/angle.svg" alt="">' +
        '<img src="../images/angle.svg" alt="">' +
        '<img src="../images/angle.svg" alt="">' +
        '</div>' +
        '<div class="des">' + item.name + '</div>' +
        '</div>' +
        '</li>'
      )

    })
    $('.remUL').html(HTML)
  }


  // 开服请求HTML
  var gameServerHTML = function (data) {
    var HTML = []
    data.map(function (item, index) {
      HTML.push(
        '<tr class="gameServerLi">' +
        '<td>' + item.name + '</td>' +
        '<td>' + item.opening_time + '</td>' +
        '<td>' +
        '<svg class="icon gifts-button" data-index=' + index + ' data-toggle="modal" data-target="#giftsModal" aria-hidden="true">' +
        '<use xlink:href="#icon-dibuicon-libao-lan"></use>' +
        ' </svg>' +
        ' </td>' +
        '<td data-toggle="modal" data-target="#myModal">' +
        '<svg class="icon" aria-hidden="true">' +
        '<use xlink:href="#icon-xiazai"></use>' +
        '</svg>' +
        '</td>' +
        ' </tr>'
      )
    })
    $('.js-gameSever').html(HTML)
  }


  // 新游请求HTML
  var newSortUrlHTML = function (data) {
    var HTML = []
    data.map(function (item, index) {
      HTML.push(
        '<li class="flex-space-between new-game-li flex-align-items-center">' +
        '<div class=" flexRow newgame-box ">' +
        ' <div class="new-game-flag"><img src="../images/one.png" alt=""></div>' +
        '<img src="../images/icon.png" alt="" class="new-game-imgicon">' +
        '<div class="flex-column flex-justify-content-center ">' +
        '<div class="flex-space-between">' +
        ' <span>' + item.name + '</span><span><img src="../images/free.png"  class="freeImg" alt=""></span>' +
        '</div>' +
        '<div>' +
        '<img src="../images/angle.svg" alt="">' +
        '<img src="../images/angle.svg" alt="">' +
        '<img src="../images/angle.svg" alt="">' +
        '<img src="../images/angle.svg" alt="">' +
        '<img src="../images/angle.svg" alt="">' +
        '</div>' +
        '<div class="marginTop1rem">三角合一</div>' +
        '</div>' +
        '</div>' +
        '<button class="layui-btn  newgame-button" data-toggle="modal" data-target="#myModal">下载</button>' +
        '</li>'
      )
    })
    $('.js-newgame').html(HTML)
  }

  // 礼包领取
  $(document).delegate(".gifts-button", "click", function () {
    var giftsID = gameServerData[$(this).attr('data-index')].gift_bag_id
    var gift_bag_name = gameServerData[$(this).attr('data-index')].name
    console.log(gift_bag_name)

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
          giftsData = data.data
          $('.js-libao-name').html(gift_bag_name)
        }
      },
      error: function (err) {
        console.log(err)
      },
    })
  });

  // modal出来啦
  $(document).delegate(".remUL li", "click", function () {
    modalHTML(remData, $(this).index())
  });
  $(document).delegate(".gameServerLi", "click", function () {
    modalHTML(gameServerData, $(this).index())
  });
  $(document).delegate(".new-game-li", "click", function () {
    modalHTML(newGameData, $(this).index())
  });


  // modal填充
  var modalHTML = function (data, index) {
    $('.js-down-name').html(data[index].name)
    $('.js-des').html(data[index].describe)
    // $('.downLoadLiimg').attr('src', data[index].logo)
    $('.androidLoad').attr('href', data[index].android_download_url)
    $('.iOSLoad').attr('href', data[index].ios_download_url)
  }

})