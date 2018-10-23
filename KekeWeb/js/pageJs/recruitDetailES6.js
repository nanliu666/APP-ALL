/*
 * @Author: NaNSix 
 * @Date: 2018-09-25 17:22:59 
 * @Last Modified by: NaNSix
 * @Last Modified time: 2018-10-23 18:30:31
 */

const recruitTableFun = (() => {
        $(document).ready(() => {
            if (sessionStorage && sessionStorage.recruit === 'school') {
                document.title = "校园招聘"
            } else {
                document.title = "社会招聘"
            }

            let [headerHTML, BodyHTML, dutyHTML, requestHTML, ] = ['', '', [],
                []
            ]

            //模拟数据
            const data = {
                name: "Erlang服务端开发工程师",
                duty: [
                    '1、使用erlang独立进行服务端框架设计和功能开发',
                    '2、与策划，客户端沟通，参与游戏功能方案讨论',
                    '3、维护服务器并参与服务端框架调优和性能调优',
                ],
                request: [
                    '1、大专以上学历，计算机或相关专业，1年以上erlang开发经验',
                    '2、精通Erlang编程，无Erlang编程但精通C',
                    '3、熟悉Linux环境，精通数据结构与算法、Socket编程、多线程编程等；',
                    '4、熟悉网络协议及常用数据库，如MySQL的设计、开发与优化；',
                    '5、良好的沟通能力与团队协作能力，高度的工作责任心和敬业精神。',
                    '6、踏实上进，善于钻研技术，富于团队精神，喜欢游戏行业。',
                ],
                contact: [
                    '简历请投递至邮箱：hr@gzzhongwan.net',
                    '或联系公司HR莫小姐：QQ3393214674'
                ]
            }

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
                    <div class="top_list">
                    <p>岗位详情</p>
                    </div>
                </div>
                `
                $('header').html(headerHTML)
            })()

            //添加body
            const BodyHTMLAdd = (() => {
                BodyHTML = `
                            <h2>${data.name}</h2>
                            <div class='duty'>
                            </div>
                            <div class='request'>
                            </div>
                            <div>
                                <p>简历请投递至邮箱：hr@gzzhongwan.net</p>
                                <p>或联系公司HR莫小姐：QQ3393214674</p>
                            </div>
                            `
                $('main').html(BodyHTML)
            })()

            const dutyHTMLAdd = ((() => {
                data.duty.map((item) => {
                    dutyHTML[0] = `<label for="">岗位职责:</label>`
                    dutyHTML += `<p>${item}</p>`
                })
                $('.duty').html(dutyHTML)
            })())
            const requestHTMLAdd = ((() => {
                requestHTML[0] = `<label for="">任职要求:</label>`
                data.request.map((item) => {
                    requestHTML += `<p>${item}</p>`
                })
                $('.request').html(requestHTML)
            })())

            $('#JSCenter').on('click', function() {
                window.location.href = './centerIndex.html'
            })
        })
})()