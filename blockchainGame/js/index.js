$(document).ready(() => {
  //模拟兑换页面数据
  const exchangeData = {
    role_id: "nanliu", //角色ID
    copper: 10, //角色ID
    block: 100, //角色ID
    exchange_ratio: 1.5 //角色ID

    //模拟数据填充
  };$(".js-roleID").html(exchangeData.role_id);
  $(".js-copper").html(exchangeData.copper);
  $(".js-block").html(exchangeData.block);
  $(".js-ratio").html(exchangeData.exchange_ratio);

  // 模拟兑换记录数据
  const recordData = [{
    code: 1, // 成功
    msg: '成功', // 成功
    data: [{
      copper: 200,
      banlance: 300, //区块链币
      status: 1, // 成功与否
      date_time: "2018-6-10", //时间
      create_time: "2018-6-10 12:13:55"
    }, {
      copper: 200,
      banlance: 300, //区块链币
      status: 1, // 成功与否
      date_time: "2018-6-10", //时间
      create_time: "2018-6-10 12:13:55"
    }]
  }];

  let recordLiHTML = [];
  // 后端拼接的数据，通过插入渲染进去HTML

  // 记录HTML拼接
  recordData.map(item => {
    item.data.map(item => {
      recordLiHTML.push(`<p class="dateP pfontsize">${item.date_time}</p>`);
      recordLiHTML.push(`
                      <li class="padding10 recordLi">
                <div class="flexspaceBetween"><span class="fontSize20"><strong>￥${item.copper}</strong></span> <span class="jsSuccess textSuccess">${item.status}</span></div>
                <div class="flexspaceBetween textP">
                    <span>消耗${item.banlance}个区块链币</span>
                    <span>${item.create_time}</span>
                </div>
                </li>
            `);
    });
  });
  $('#Js-record ul').html(recordLiHTML);

  // 成功失败样式显示
  const jsSuccess = $('.jsSuccess');
  for (let i = 0; i < jsSuccess.length; i++) {
    console.log(jsSuccess[i].innerHTML);
    if (jsSuccess[i].innerHTML === '1') {
      jsSuccess[i].innerHTML = '兑换成功';
    } else {
      jsSuccess[i].innerHTML = '兑换失败';
      jsSuccess[i].classList.remove('textSuccess');
      jsSuccess[i].classList.add('textErr');
    }
  }

  // nav栏切换效果
  const navList = $('nav li');
  const title = ['兑换', '兑换记录'];
  const mainChildren = $('main').children();
  for (let i = 0; i < navList.length; i++) {
    $(navList[i]).click(() => {
      document.title = title[i];
      $('header h3').text(title[i]);

      $(navList[i]).addClass('active').siblings().removeClass('active');
      $(mainChildren[i]).show().siblings().hide();
    });
  }

  // 跳转修改密码
  $('.jsPassword').on('click', () => {
    location.href = './changePassword.html';
  });

  // 退出登录
  $('.loginOut').on('click', () => {
    location.href = './password.html';
  });
});
