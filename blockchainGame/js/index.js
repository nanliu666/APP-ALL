'use strict';

$(document).ready(function () {
  var time = moment().format('YYYY-MM-DD HH:mm');
  var data = [{
    title: '兑换',
    gameID: '12324587',
    balance: 11
  }, {
    title: '兑换记录',
    Erecord: [{
      date: moment().format('YYYY-MM-DD'),
      number: [{
        success: 0,
        time: time,
        RMB: 10,
        gold: 10
      }, {
        success: 0,
        time: time,
        RMB: 10,
        gold: 10
      }, {
        success: 0,
        time: time,
        RMB: 10,
        gold: 10
      }, {
        success: 0,
        time: time,
        RMB: 10,
        gold: 10
      }, {
        success: 1,
        time: time,
        RMB: 10,
        gold: 10
      }]
    }]
  }, {
    title: '个人中心',
    gameID: '12324587'
  }];
  var exchange = data[0],
      record = data[1],
      center = data[2];
  var recordLiHTML = [],
      successHTML = [];

  document.title = '兑换';
  $('header h2').text('兑换');

  // 记录
  record.Erecord.map(function (item) {
    recordLiHTML.push('<p>' + item.date + '</p>');
    item.number.map(function (item) {
      recordLiHTML.push('\n                      <li class="padding10">\n                <div class="flexspaceBetween"><span class="fontSize20"><strong>\uFFE5' + item.RMB + '</strong></span> <span class="jsSuccess textSuccess">' + item.success + '</span></div>\n                <div class="flexspaceBetween textP">\n                    <span>\u6D88\u8017' + item.gold + '\u4E2A\u533A\u5757\u94FE\u5E01</span>\n                    <span>' + item.time + '</span>\n                </div>\n                </li>\n            ');
    });
  });
  $('#Js-record ul').html(recordLiHTML);
  var jsSuccess = $('.jsSuccess');
  for (var i = 0; i < jsSuccess.length; i++) {
    if (jsSuccess[i].innerHTML === '0') {
      jsSuccess[i].innerHTML = '成功';
    } else {
      jsSuccess[i].innerHTML = '失败';
      jsSuccess[i].classList.remove('textSuccess');
      jsSuccess[i].classList.add('textErr');
    }
  }

  // nav栏切换效果
  var navList = $('nav li');
  var mainChildren = $('main').children();

  var _loop = function _loop(_i) {
    $(navList[_i]).click(function () {
      document.title = data[_i].title;
      $('header h2').text(data[_i].title);
      $(navList[_i]).addClass('active').siblings().removeClass('active');
      $(mainChildren[_i]).show().siblings().hide();
    });
  };

  for (var _i = 0; _i < navList.length; _i++) {
    _loop(_i);
  }

  // 跳转修改密码
  $('.jsPassword').on('click', function () {
    location.href = './changePassword.html';
  });

  // 退出登录
  $('.loginOut').on('click', function () {
    location.href = './password.html';
  });
});
