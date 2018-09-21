const recruitTableFun = (() => {
    if (sessionStorage.loginSuccess && sessionStorage.loginSuccess === 'success') {
        $(document).ready(() => {
            if (sessionStorage && sessionStorage.recruit === 'school') {
                document.title = "校园招聘"
            } else {
                document.title = "社会招聘"
            }

            let [headerHTML, ] = ['', ]

            // axios GET参数获取
            const axiosGet = new $axiosGet()
            let axiosConfig = axiosGet.$axiosGetConfig()

            //添加header
            const headerHTMLAdd = (() => {
                headerHTML = `
                <div class="topInfo">
                    <a href='./index.html'><img src="images/logo (2).png" class="logo" /></a>
                    <span style="float: right">
                                <span class="mui-icon mui-icon-contact" id="JSCenter" style="font-size:38px; padding: 10px"></span>
                    </span>
                </div>
                `
                $('header').html(headerHTML)
            })();





            $('#JSCenter').on('click', function() {
                window.location.href = './centerIndex.html'
            })
        })
    } else {
        location.href = './login.html'
    }
})()