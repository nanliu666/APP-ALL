$(document).ready(() => {
  const time = moment().format('YYYY-MM-DD HH:mm')

  //模拟后台数据，后端的数据接入字段data
  const data = [{
      title: '兑换',
      gameID: '12324587',
      balance: 11
    },
    {
      title: '兑换记录',
      Erecord: [{
        date: moment().format('YYYY-MM-DD'),
        number: [{
            success: 0,
            time,
            RMB: 10,
            gold: 10
          },
          {
            success: 0,
            time,
            RMB: 10,
            gold: 10
          },
          {
            success: 0,
            time,
            RMB: 10,
            gold: 10
          },
          {
            success: 0,
            time,
            RMB: 10,
            gold: 10
          },
          {
            success: 1,
            time,
            RMB: 10,
            gold: 10
          }
        ]
      }, {
        date: moment().format('YYYY-MM-DD'),
        number: [{
            success: 0,
            time,
            RMB: 10,
            gold: 10
          },
          {
            success: 0,
            time,
            RMB: 10,
            gold: 10
          },
          {
            success: 0,
            time,
            RMB: 10,
            gold: 10
          },
          {
            success: 0,
            time,
            RMB: 10,
            gold: 10
          },
          {
            success: 1,
            time,
            RMB: 10,
            gold: 10
          }
        ]
      }]
    },
    {
      title: '个人中心',
      gameID: '12324587'
    }
  ]

  //兑换字段为exchange， 记录页面字段为record， 个人中心页面字段为center
  let [exchange, record, center] = data
  let [recordLiHTML, successHTML] = [
    [],
    []
  ]

  // 后端拼接的数据，通过插入渲染进去HTML
  document.title = '兑换'
  $('header h3').text('兑换')

  // 记录HTML拼接
  record.Erecord.map(item => {
    recordLiHTML.push(`<p class="dateP pfontsize">${item.date}</p>`)
    item.number.map(item => {
      recordLiHTML.push(`
                      <li class="padding10 recordLi">
                <div class="flexspaceBetween"><span class="fontSize20"><strong>￥${
                  item.RMB
                }</strong></span> <span class="jsSuccess textSuccess">${
        item.success
      }</span></div>
                <div class="flexspaceBetween textP">
                    <span>消耗${item.gold}个区块链币</span>
                    <span>${item.time}</span>
                </div>
                </li>
            `)
    })
  })
  $('#Js-record ul').html(recordLiHTML)

  // 成功失败样式显示
  const jsSuccess = $('.jsSuccess')
  for (let i = 0; i < jsSuccess.length; i++) {
    if (jsSuccess[i].innerHTML === '0') {
      jsSuccess[i].innerHTML = '兑换成功'
    } else {
      jsSuccess[i].innerHTML = '兑换失败'
      jsSuccess[i].classList.remove('textSuccess')
      jsSuccess[i].classList.add('textErr')
    }
  }

  // nav栏切换效果
  const navList = $('nav li')
  const mainChildren = $('main').children()
  for (let i = 0; i < navList.length; i++) {
    $(navList[i]).click(() => {
      document.title = data[i].title
      $('header h3').text(data[i].title)
      $(navList[i])
        .addClass('active')
        .siblings()
        .removeClass('active')
      $(mainChildren[i])
        .show()
        .siblings()
        .hide()
    })
  }

  // 跳转修改密码
  $('.jsPassword').on('click', () => {
    location.href = './changePassword.html'
  })

  // 退出登录
  $('.loginOut').on('click', () => {
    location.href = './password.html'
  })
})