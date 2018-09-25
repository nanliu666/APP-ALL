/*
 * @Author: NaNSix 
 * @Date: 2018-09-25 17:24:19 
 * @Last Modified by:   NaNSix 
 * @Last Modified time: 2018-09-25 17:24:19 
 */

if (sessionStorage.loginSuccess && sessionStorage.loginSuccess === 'success') {
    $(document).ready(() => {
        mui('body').on('tap', 'a', function() {
            document.location.href = this.href;
        });
        mui.init();
        $('#JSCenter').on('click', function() {
            window.location.href = './centerIndex.html'
        })

        // 添加nav
        const navHTML = nav(2)
        $("nav").html(navHTML)

        //axios请求
        axios.defaults.baseURL = 'http://192.168.2.159:7002';
        axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

        // todo 去除滚动条
        const [giftListUrl, CDKeydURL, now_time, platform, ] = ['/gift-bag/index', '/gift-bag-user-cdkey/index', parseInt(moment().unix()), 'web', ]
        let [describe, game_name, gift_bag_id, gift_bag_name, hot, CDkeyHTML] = [
            [],
            [],
            [],
            [],
            [],
            [],
        ]
        const signObj = {
            now_time,
            platform,
        }
        const sign = getSign(signObj) //调用签名函数获取签名
        const axiosConfig = {
            method: "GET",
            params: {
                now_time,
                platform,
                sign,
            },
        }

        axios(giftListUrl, axiosConfig)
            .then(function(response) {
                let data = response.data.data
                HTMLAdd(data)
            })
            .catch(function(error) {
                console.log(error);
            });


        function HTMLAdd(data, index) {
            _.sortBy(data, (data) => {
                return data.hot
            })
            data.map((item, index) => {
                describe.push(item.describe)
                game_name.push(item.game_name)
                gift_bag_id.push(item.gift_bag_id)
                gift_bag_name.push(item.gift_bag_name)
                hot.push(item.hot)
            })

            HTMLCreate(data, index)
            $(".giftBox").html(CDkeyHTML)



            //礼包领取
            CDKey(gift_bag_id)

            //模态框加载数据
            modalStart("div[data-index]")

        }

        //礼包领取
        function CDKey(gift_bag_id) {
            if (gift_bag_id && !!gift_bag_id) {
                const giftList = document.querySelectorAll('div[data-index]')
                for (let i = 0; i < giftList.length; i++) {
                    giftList[i].addEventListener('click', () => {
                        Object.assign(signObj, { gift_bag_id: gift_bag_id[i] })
                        let sign = getSign(signObj) //调用签名函数获取签名
                        let axiosConfig = {
                            method: "GET",
                            params: {
                                now_time,
                                platform,
                                sign,
                                gift_bag_id: gift_bag_id[i]
                            },
                        }
                        axios(CDKeydURL, axiosConfig)
                            .then(function(response) {

                            })
                            .catch(function(error) {
                                console.log(error);
                            });
                    }, false)
                }

            } else {
                // layer提示
                mui("#tb1").on('tap', '.gf', function(event) {
                    layer.open({
                        content: '暂无礼包领取',
                        skin: 'msg',
                        time: 2 //2秒后自动关闭
                    });

                });
            }
        }

        function modalStart(NodeList) {
            //模态框加载数据
            let divList = $(NodeList)
            for (let i = 0; i < divList.length; i++) {
                divList[i].onclick = function() {
                    let params = [describe[i], game_name[i]]
                    let modalHTML = modal(params, 0)
                    $('#modal').html(modalHTML)
                }
            }
        }

        function HTMLCreate(data, index) {
            for (let i = 0; i < data.length; i++) {
                CDkeyHTML += `
                <div class="content" data-index=${i}>
                    <div class="middle" style="width: 69%;margin-left: 4%;">
                        <div class="left_img">
                            <img src="images/icon.png" class="imagess" />
                        </div>
                        <div class="right_info">
                            <p class="d_name">${data[i].game_name}</p>
                            <p style="line-height: 1.1rem;">
                                <img src="images/angle.svg" />
                                <img src="images/angle.svg" />
                                <img src="images/angle.svg" />
                                <img src="images/angle.svg" />
                                <img src="images/angle.svg" />
                            </p>
                            <p class="d_describe">${data[i].describe}</p>
                        </div>
                    </div>
                    <div class="right">
                        <button class="dlBtn gf gift_bag_id" data-toggle="modal" data-target="#downModal">领取礼包</button>
                    </div>
                </div>
                    `
            }
        }

    })
} else {
    location.href = './login.html'
}