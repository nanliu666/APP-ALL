$(document).ready(function () {
  //index 页面ajax 
  var newSortUrl = '/game/new-sort'
  var recommendURL = '/game/recommend'
  var remData = ''
  var newGameData = ''
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
        ' <span>' + item.name + '</span><span><img src="../images/free.png" class="freeImg" alt=""></span>' +
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
        '<button class="layui-btn layui-btn-normal newgame-button" data-toggle="modal" data-target="#myModal">下载</button>' +
        '</li>'
      )
    })
    $('.js-newgame').html(HTML)
  }

  // modal出来啦
  $(document).delegate(".remUL li", "click", function () {
    modalHTML(remData, $(this).index())
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