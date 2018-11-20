<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>兑换</title>
  <link rel="stylesheet" href="../css/reset.css">
  <link rel="stylesheet" href="../css/bootstrap.css">
  <link href="../css/common.css" rel="stylesheet" type="text/css" />
  <link href="../css/index.css" rel="stylesheet" type="text/css" />
  <link rel="stylesheet" type="text/css" href="../icon/iconfont.css">
  <link rel="stylesheet" href="../css/dropload.css">
</head>

<body>
  <div class="container">
    <header class="flexWcenter header">
      <h3>兑换记录</h3>
    </header>
    <main class="main">
      <div class="" id="Js-record">
        <div class="JSDate"></div>
        <ul>
        </ul>
      </div>
    </main>
    <footer>
      <nav class="fixed-bottom flexspaceBetween footer-nav">
        <li class="col-6 flexALLcenter  navli js-duihuan">
          <i class="iconfont icon-jiaoyi-"></i>
          <span>兑换</span>
        </li>
        <li class="col-6 flexALLcenter active navli js-record">
          <i class="iconfont icon-jiaoyijilu"></i>
          <span>兑换记录</span>
        </li>
      </nav>
    </footer>
  </div>
</body>

<script src="../js/jquery.js"></script>
<script src="../js/dropload.js"></script>
<script src="../js/lodash.js"></script>
<script>
   $(function () {
    // 页数
    var page = 0;
    // 每页展示5个
    var size = 10;

    // dropload
    $('.container').dropload({
      scrollArea: window,
      domDown: {
        domClass: 'dropload-down',
        domRefresh: '<div class="dropload-refresh">↑上拉加载更多</div>',
        domLoad: '<div class="dropload-load"><span class="loading"></span>加载中...</div>',
        domNoData: '<div class="dropload-noData">暂无数据-自定义内容</div>'
      },
      loadDownFn: function (me) {
        page++;
        // 拼接HTML
        var result = '';
        $.ajax({
          type: 'GET',
          // todo 等你接口哦
          // url: '../json/recordData.json',
          url: '/blockchain/block/exchange_list?page=' + page + '&page_size=' + size,
          dataType: 'json',
          success: function (r) {
            if (r && r.code == 0) {
              var recordData = r
              // 如果没有数据
            } else {
              // 锁定
              me.lock();
              // 无数据
              me.noData();
            }
            // 为了测试，延迟1秒加载
            setTimeout(function () {
              // 插入数据到页面，放到最后面
              putHtml(recordData);
              // 每次数据插入，必须重置
              me.resetload();
            }, 1000);
          },
          error: function (xhr, type) {
            alert('Ajax error!');
            // 即使加载出错，也得重置
            me.resetload();
          }
        });
      }
    });
  });
  var recordLiHTML = [];
  // 记录HTML拼接
  function putHtml(recordData) {
    var groupedItems = _.chain(recordData.data)
      .orderBy('date_time')
      .groupBy(function (item) {
        return item.date_time
      })
      .map(function (items, date_time) {
        return {
          date_time: date_time,
          items: items
        }
      })
      .value()


    groupedItems.map(function (item) {
      console.log($('#Js-record ul .dateP').last().text())
      if (item.date_time !== $('#Js-record ul .dateP').last().text()) {
        recordLiHTML.push(
          '<p class="dateP pfontsize">' + item.date_time + '</p>'
        );
      }
      item.items.map(function (item) {
        item.status = to_status(item.status);
        recordLiHTML.push(
          ' <li class="padding10 recordLi"><div class="flexspaceBetween"><span class="fontSize20"><strong>￥' +
          item.copper + '</strong></span> <span class="jsSuccess textSuccess">' +
          item.status + '</span></div><div class="flexspaceBetween textP">' +
          '<span>消耗' + item.banlance + '个区块链币</span>' +
          '<span>' + item.create_time + '</span>' + ' </div></li>'
        )
      })
    });
    $('#Js-record ul').html(recordLiHTML);

  }
  // 成功失败样式显示
  const jsSuccess = $('.jsSuccess');
  for (let i = 0; i < jsSuccess.length; i++) {
    if (jsSuccess[i].innerHTML === '1') {
      jsSuccess[i].innerHTML = '兑换成功';
    } else {
      jsSuccess[i].innerHTML = '兑换失败';
      jsSuccess[i].classList.remove('textSuccess');
      jsSuccess[i].classList.add('textErr');
    }
  }

  function to_status(status) {
    var str_status = '';
    switch (Number(status)) {
      case 0:
        str_status = '兑换失败';
        break;
      case 1:
        str_status = '兑换成功';
        break;
      case 2:
        str_status = '兑换处理中';
        break;
    }
    return str_status;
  }

  // nav栏切换效果
  $('.footer-nav').on('click', '.navli', function () {
    $(this).addClass('active').siblings().removeClass('active')
    if ($(this).hasClass('js-record')) {
      location.href = 'record'
    } else {
      location.href = 'role_info'
    }
  })
</script>

</html>
