/*
 * @Author: NaNSix 
 * @Date: 2018-09-25 17:24:38 
 * @Last Modified by: NaNSix
 * @Last Modified time: 2018-10-24 15:37:43
 */
const recruitTableFun = (() => {
        $(document).ready(() => {
            if (sessionStorage && sessionStorage.recruit === 'school') {
                document.title = "校园招聘"
            } else {
                document.title = "社会招聘"
            }

            // URL统一管理
            const [recruitTypeUrl, recruitPositionURL, ] = ['/recruit/type', '/recruit/position']

            //传入数据统一管理
            let [typeData, positionData] = [
                [],
                []
            ]


            // 拼接字符串统一管理
            let [headerHTML, LiHTML, TbodyAddHTML, ] = ['', [],
                [],
            ]

            // axios GET参数获取
            const axiosGet = new $axiosGet()
            let axiosConfig = axiosGet.$axiosGetConfig()

            const navAxios = ((() => {
                axios(recruitTypeUrl, axiosConfig)
                    .then((result) => {
                        typeData = result.data.data
                        navLi(typeData)
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            })())

            // 表格数据请求
            const TBodyAxios = ((recruit_type_id) => {
                if (!!recruit_type_id) { //有ID把ID传进去
                    axiosConfig = axiosGet.$axiosGetConfig({ 'recruit_type_id': recruit_type_id })
                } else { //没有就直接请求所有岗位
                    axiosConfig = axiosGet.$axiosGetConfig()
                }
                axios(recruitPositionURL, axiosConfig)
                    .then((result) => {
                        positionData = Array.from(new Set(result.data.data))
                        TbodyAdd(positionData)
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            })
            TBodyAxios()

            //添加header
            const headerHTMLAdd = ((() => {
                headerHTML = `
                <div class="topInfo">
                    <a href='./index.html'><img src="images/logo (2).png" class="logo" /></a>
                    <span style="float: right">
                                <span class="mui-icon mui-icon-contact" id="JSCenter" style="font-size:38px; padding: 10px"></span>
                    </span>
                </div>
                `
                $('header').html(headerHTML)
            })())

            // nav导航
            const navLi = ((params) => {
                LiHTML[0] = `<li class=" flexCenterALL liActive">全部</li>`
                for (let i = 0; i < params.length; i++) {
                    LiHTML.push(`
                    <li class="flexCenterALL liborder" data-index='${params[i].recruit_type_id}'>${params[i].recruit_type_name}</li>
                `)
                }
                $('nav').html(LiHTML)
                navLiClick()
            })

            const TbodyAdd = (params) => {
                TbodyAddHTML = []
                params.map((item, index) => {
                    TbodyAddHTML.push(` <tr recruit_position_id='${item.recruit_position_id}'><td>${item.recruit_position_name}</td><td>${item.recruit_type_name}</td><td>面议</td></tr>`)
                })
                $('tbody').html(TbodyAddHTML)
                TbodyTdClick()

            }

            const navLiClick = () => {
                $("nav li").click(function() {
                    const recruit_type_id = $(this).attr('data-index')
                    $(this).addClass('liActive').siblings().removeClass('liActive')
                    $(this).removeClass('liborder').siblings().addClass('liborder')
                    TBodyAxios(recruit_type_id)
                })
            }

            const TbodyTdClick = () => {
                $('tbody tr').click(function() { //这里不用箭头函数，this需要指向tbody
                    console.log($(this).attr('recruit_position_id'))
                    sessionStorage.setItem('recruit_position_id', $(this).attr('recruit_position_id'))
                    location.href = './recruitDetail.html'
                })
            }
            $('#JSCenter').on('click', function() {
                window.location.href = './centerIndex.html'
            })
        })
})()