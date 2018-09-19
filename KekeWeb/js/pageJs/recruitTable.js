if (sessionStorage.loginSuccess && sessionStorage.loginSuccess === 'success') {
    $(document).ready(() => {
        if (sessionStorage && sessionStorage.recruit === 'school') {
            document.title = "校园招聘"
        } else {
            document.title = "社会招聘"
        }
        const [newSortUrl, recommendURL, ] = ['/recruit/type', '/recruit/position']

        // axios GET参数获取
        const axiosConfig = $axiosGetConfig()

        function getnewSortUrl() {
            return axios(newSortUrl, axiosConfig);
        }
        axios(newSortUrl, axiosConfig)
            .then((result) => {
                console.log(result)
            })
            .catch((err) => {
                console.log(err)
            })

        axios(recommendURL, axiosConfig)
            .then((result) => {
                console.log(result)
            })
            .catch((err) => {
                console.log(err)
            })

        const reciuitText = ['全部', '技术类', '策划类', '美术类', '职能类', ]
        const tBodyText = [{
            A: 'Erlang服务端开发工程师111',
            B: '技术类',
            C: '面议'
        }, {
            A: 'Erlang服务端开发工程师222',
            B: '策划类',
            C: '面议'
        }, {
            A: 'Erlang服务端开发工程师333',
            B: '美术类',
            C: '面议'
        }, , {
            A: 'Erlang服务端开发工程师444',
            B: '职能类',
            C: '面议'
        }, , {
            A: 'Erlang服务端开发工程师555',
            B: '技术类',
            C: '面议'
        }, ]
        let [headerHTML, LiHTML, tBody1, tBody2, tBody3, tBody4, tBody5, ] = ['', [],
            [],
        ]
        headerHTML = `
        <div class="topInfo">
        <a href='./index.html'><img src="images/logo (2).png" class="logo" /></a>
        <span style="float: right">
                    <span class="mui-icon mui-icon-contact" id="JSCenter" style="font-size:38px; padding: 10px"></span>
        </span>
    </div>
        `

        for (let i = 0; i < reciuitText.length; i++) {
            LiHTML.push(`
            <li class="flexCenterW div25" data-index='${i}'>${reciuitText[i]}</li>
        `)
        }
        LiHTML[0] = `<li class="div25 flexCenterW  active" data-index='${0}'>${reciuitText[0]}</li>`

        $('header').html(headerHTML)
        $('nav').html(LiHTML)

        var myRows = $('table tr').click(function() {

            alert(myRows.index(this));

        });

        tBodyText.map((item, index, tBodyText) => {
            if (item.B === '技术类') {
                tBody2 += `
        <tr><td>${item.A}</td><td>${item.B}</td><td>${item.C}</td></tr>
    `
            }
            if (item.B === '策划类') {
                tBody3 += `
        <tr><td>${item.A}</td><td>${item.B}</td><td>${item.C}</td></tr>
    `
            }
            if (item.B === '美术类') {
                tBody4 += `
        <tr><td>${item.A}</td><td>${item.B}</td><td>${item.C}</td></tr>
    `
            }
            if (item.B === '职能类') {
                tBody5 += `
        <tr><td>${item.A}</td><td>${item.B}</td><td>${item.C}</td></tr>
    `
            } else {
                tBody1 += `
            <tr><td>${item.A}</td><td>${item.B}</td><td>${item.C}</td></tr>
        `
            }
        })
        $('tbody').html(tBody1)
        $("nav li").click(function() {
            var item = $(this).index(); //获取索引下标 也从0开始
            $(this).siblings().removeClass('active')
            $(this).addClass('active')

            switch ($(this)[0].innerText) {
                case '技术类':
                    $('tbody').html(tBody2)
                    break
                case '策划类':
                    $('tbody').html(tBody3)
                    break
                case '美术类':
                    $('tbody').html(tBody4)
                    break
                case '职能类':
                    $('tbody').html(tBody5)
                    break
                default:
                    $('tbody').html(tBody1)
                    break
            }
        })
        var myRows = $('tbody tr').click(function() {

            alert(myRows.index(this));

        });
    })
} else {
    location.href = './login.html'
}