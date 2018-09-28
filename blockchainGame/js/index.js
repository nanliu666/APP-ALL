$(document).ready(() => {

    const time = moment().format('YYYY-MM-DD HH:mm')
    const data = [{
            title: '兑换',
            gameID: "12324587",
            balance: 11,
        }, {
            title: '兑换记录',
            Erecord: [{
                date: moment().format('YYYY-MM-DD'),
                number: [{
                    success: 0,
                    time,
                    RMB: 10,
                    gold: 10,
                }, {
                    success: 0,
                    time,
                    RMB: 10,
                    gold: 10,
                }, {
                    success: 0,
                    time,
                    RMB: 10,
                    gold: 10,
                }, {
                    success: 0,
                    time,
                    RMB: 10,
                    gold: 10,
                }, {
                    success: 1,
                    time,
                    RMB: 10,
                    gold: 10,
                }, ]
            }, ],
        }, {
            title: '个人中心',
            gameID: "12324587",
        }

    ]
    let [exchange, record, center] = data
    let [recordLiHTML, successHTML] = [
        [],
        []
    ]
    document.title = '兑换';
    $("header h2").text("兑换")

    $(".JSDate").html(`<p>${record.Erecord[0].date}</p>`)

    // 记录
    record.Erecord.map((item) => {
        item.number.map((item) => {
            recordLiHTML.push(`
            <li class="padding10">
              <div class="flexspaceBetween"><span class="fontSize20"><strong>￥${item.RMB}</strong></span> <span class="jsSuccess textSuccess">${item.success}</span></div>
              <div class="flexspaceBetween textP">
                  <span>消耗${item.gold}个区块链币</span>
                  <span>${item.time}</span>
              </div>
            </li>
          `)
        })
    })
    $('#Js-record ul').html(recordLiHTML)
    const jsSuccess = $('.jsSuccess')
    for (let i = 0; i < jsSuccess.length; i++) {
        if (jsSuccess[i].innerHTML === '0') {
            jsSuccess[i].innerHTML = '成功'
        } else {
            jsSuccess[i].innerHTML = '失败'
            jsSuccess[i].classList.remove("textSuccess")
            jsSuccess[i].classList.add("textErr")
        }
    }

    // nav栏切换效果
    const navList = $('nav li')
    const mainChildren = $('main').children()
    for (let i = 0; i < navList.length; i++) {
        $(navList[i]).click(() => {
            document.title = data[i].title;
            $("header h1").text(data[i].title)
            $(navList[i]).addClass('active').siblings().removeClass('active')
            $(mainChildren[i]).siblings().addClass('displayNone')
            $(mainChildren[i]).removeClass('displayNone')
            $(mainChildren[i]).addClass('displayBlock').siblings().removeClass('displayBlock')
        })
    }


    // 跳转修改密码
    $(".jsPassword").on('click', () => {
        location.href = './changePassword.html'
    })

    // 退出登录
    $('.loginOut').on('click', () => {
        location.href = './password.html'
    })
})