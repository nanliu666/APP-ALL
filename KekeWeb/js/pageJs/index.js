if (sessionStorage.loginSuccess && sessionStorage.loginSuccess === 'success') {
    $(document).ready(() => {
        mui('body').on('tap', 'a', function() {
            document.location.href = this.href;
        });
        mui('#tableBox').scroll({});
        mui.init();
        var slider = mui("#slider");
        slider.slider({
            interval: 5000
        });


        closeMask = function() {
            $(".mui-backdrop").fadeOut();
        }

        //  分辨率自适应
        var width = document.body.clientWidth;
        if (width <= 320) {
            $(".white_content").css("height", "50%");
            $(".white_content").css("top", "25%");
        }

        $('#JSCenter').on('click', function() {
            window.location.href = './centerIndex.html'
        })

        // 添加nav
        const navHTML = nav(0)
        $("nav").html(navHTML)

        //axios请求
        axios.defaults.baseURL = 'http://192.168.2.159:7002';
        axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

        const [newSortUrl, IndexUrl, recommendURL, CDKeydURL, now_time, platform, ] = ['/game/new-sort', '/game-server/index', '/game/recommend', '/gift-bag-user-cdkey/index', parseInt(moment().unix()), 'web', ]
        let signObj = {
            now_time,
            platform,
        }
        const sign = getSign(signObj) //调用签名函数获取签名
        let axiosConfig = {
            method: "GET",
            params: {
                now_time,
                platform,
                sign,
            },
        }

        //变量统一管理
        let [remHTML, logoList, describe, nameHTML, android_download_url, ios_download_url] = ['', [],
            [],
            [],
            [],
            []
        ]
        // URL请求
        function getnewSortUrl() {
            return axios.get(newSortUrl, axiosConfig);
        }

        function getrecommendURL() {
            return axios.get(recommendURL, axiosConfig);
        }

        function getIndexUrl() {
            return axios.get(IndexUrl, axiosConfig);
        }

        //礼包领取
        function CDKey(gift_bag_id) {
            if (gift_bag_id && !!gift_bag_id) {
                const giftList = document.querySelectorAll('.gift_bag_id')
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
                                console.log(response);
                                let data = response.data
                                    //  获取礼包ID后去获取CDKEY
                                modalStart("td[data-indexCD]", 0, data)
                            })
                            .catch(function(error) {
                                console.log(error);
                            });
                    }, false)
                }

            } else {
                // 无礼包时layer提示
                mui("#tb1").on('tap', '.gf', function(event) {
                    layer.open({
                        content: '暂无礼包领取',
                        skin: 'msg',
                        time: 2 //2秒后自动关闭
                    });
                });

            }
        }

        // 开启模态框
        function modalStart(NodeList, index, data) {
            //模态框加载数据
            let divList = $(NodeList)
                //礼包modal开启
            if (index === 0) {
                let [game_name] = data
                for (let i = 0; i < divList.length; i++) {
                    divList[i].onclick = function() {

                        // FIX 同一个礼包接口返回不同数据要求后端处理
                        let params = [describe[i], game_name[i]]
                        console.log(params)
                        let modalHTML = modal(params, 0)
                        $('#modal').html(modalHTML)
                    }
                }
            } else {
                //下载modal开启
                for (let i = 0; i < divList.length; i++) {
                    divList[i].onclick = function() {
                        let params = [logoList[i], nameHTML[i], describe[i], android_download_url[i], ios_download_url[i]]
                        let modalHTML = modal(params)
                        $('#modal').html(modalHTML)
                    }
                }

            }
        }

        // HTML创建
        function HTMLCreate(remData) {
            console.log("新游请求=》", remData)
            for (let i = 0; i < remData.length; i++) {
                logoList.push(remData[i].logo)
                describe.push(remData[i].describe)
                nameHTML.push(remData[i].name)
                android_download_url.push(remData[i].android_download_url)
                ios_download_url.push(remData[i].ios_download_url)
                remHTML += `
                <div class="list_content" data-toggle="modal" data-target="#downModal" data-index=${i}>
                    <div class="left_img">
                        <img src="${logoList[i]}" />
                    </div>
                    <div class="right_info">
                        <p>${nameHTML[i]}<img src="images/free.png" class="icon"></p>
                        <p>
                            <img src="images/angle.svg" />
                            <img src="images/angle.svg" />
                            <img src="images/angle.svg" />
                            <img src="images/angle.svg" />
                            <img src="images/angle.svg" />
                        </p>
                        <p>${describe[i]}</p>
                    </div>
                </div>
                `
            }
        }
        axios.all([getnewSortUrl(), getrecommendURL(), getIndexUrl()])
            .then(axios.spread(function(newSort, rem, start, ) {

                // 推荐游戏请求
                if (!!rem.data.data && rem.data.data) {
                    let remData = rem.data.data
                    remData = _.sortBy(remData, function(item) {
                        return item.hot;
                    });

                    HTMLCreate(remData)
                    $('.list_Body').html(remHTML)

                    //模态框加载数据
                    modalStart("div[data-index]")
                }

                //  新游请求
                if (!!newSort.data.data && newSort.data.data) {
                    let data = newSort.data.data
                    data = _.sortBy(data, function(item) {
                        return item.hot;
                    });
                    let [modalnameHTML, modalgameImgHTML, modaldescribeHTML, newGameHTML, android_download_url, ios_download_url, imgSrcArr, propaganda_img] = [
                        [],
                        [],
                        [],
                        '', [],
                        [],
                        [
                            'images/one.png',
                            'images/two.png',
                            'images/three.png',
                            'images/two.png',
                        ],
                        []
                    ]

                    for (let i = 0; i < data.length; i++) {
                        newGameHTML += `
                                    <div class="content"  data-indexNEW=${i}>
                                        <div class="left">
                                            <img src = "images/one.png"/>
                                        </div>
                                        <div class="middle">
                                            <div class="left_img">
                                                <img src="${data[i].logo}" style="width: 90%;" />
                                            </div>
                                            <div class="right_info">
                                                <p class="d_name">${data[i].name}</p>
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
                                            <button class="dlBtn" data-toggle="modal" data-target="#downModal">下载</button>
                                        </div>
                                    </div>
                                `
                        modalnameHTML.push(`${data[i].name}`)
                        modalgameImgHTML.push(`${data[i].logo}`)
                        modaldescribeHTML.push(`${data[i].describe}`)
                        android_download_url.push(`${data[i].android_download_url}`)
                        ios_download_url.push(`${data[i].ios_download_url}`)
                        propaganda_img.push(`${data[i].propaganda_img}`)
                    }
                    $("#tb2").html(newGameHTML)

                    //添加图片
                    let imgWrap = $('.content');

                    function preloadImg(arr) {
                        for (var i = 0; i < arr.length; i++) {
                            imgWrap[i].src = arr[i];
                        }
                    }
                    preloadImg(imgSrcArr);

                    //模态框加载数据
                    let divList = $("div[data-indexNEW]")
                    for (let i = 0; i < divList.length; i++) {
                        divList[i].onclick = function() {
                            let params = [modalgameImgHTML[i], modalnameHTML[i], modaldescribeHTML[i], android_download_url[i], ios_download_url[i]]
                            console.log(modalgameImgHTML)
                            let modalHTML = modal(params)
                            $('#modal').html(modalHTML)
                        }
                    }
                }


                //开服游戏
                if (!!start.data.data && start.data.data) {
                    let data = start.data.data
                    _.sortBy(data, function(item) {
                        return item.opening_time;
                    });
                    let [game_server_id, gift_bag_id, name, opening_time, android_download_url, ios_download_url, openHTML] = [
                        [],
                        [],
                        [],
                        [],
                        [],
                        [],
                        [],
                    ]
                    for (let i = 0; i < data.length; i++) {
                        game_server_id.push(`${data[i].game_server_id}`)
                        name.push(`${data[i].name}`)
                        opening_time.push(`${data[i].opening_time}`)
                        android_download_url.push(`${data[i].android_download_url}`)
                        gift_bag_id.push(`${data[i].gift_bag_id}`)
                        ios_download_url.push(`${data[i].ios_download_url}`)

                        openHTML.push(`
                            <tr >
                                <td>${data[i].name}</td>
                                <td>${data[i].opening_time}</td>
                                <td class='gift_bag_id' data-indexCD=${i}><img src="images/gf.svg" class="gf" data-toggle="modal" data-target="#downModal"></td>
                                <td data-indexNEW=${i}><img src="images/download.svg"  data-toggle="modal" data-target="#downModal"></td>
                            </tr>
                        `)
                    }
                    $("tbody").html(openHTML)
                    let divList = $("td[data-indexNEW]")
                    for (let i = 0; i < divList.length; i++) {
                        divList[i].onclick = function() {
                            console.log(divList[i])
                            let params = [game_server_id[i], name[i], gift_bag_id[i], android_download_url[i], ios_download_url[i]]
                            let modalHTML = modal(params)
                            $('#modal').html(modalHTML)
                        }
                    }

                    //礼包领取逻辑
                    CDKey(gift_bag_id)

                }

            }))
    })
} else {
    location.href = './login.html'
}