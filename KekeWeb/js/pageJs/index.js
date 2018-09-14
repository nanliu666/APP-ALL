let closeMask, down, onLoad
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
        // layer提示
        mui("#tb1").on('tap', '.gf', function(event) {
            layer.open({
                content: '暂无礼包领取',
                skin: 'msg',
                time: 2 //2秒后自动关闭
            });
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

        //axios请求
        axios.defaults.baseURL = 'http://192.168.2.159:7002';
        axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

        const [newSortUrl, IndexUrl, hotURL, recommendURL, now_time, platform, ] = ['/game/new-sort', '/game-server/index', '/game/hot-sort', '/game/recommend', parseInt(moment().unix()), 'web', ]
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

        function getnewSortUrl() {
            return axios.get(newSortUrl, axiosConfig);
        }

        function gethotURL() {
            return axios.get(hotURL, axiosConfig);
        }

        function getrecommendURL() {
            return axios.get(recommendURL, axiosConfig);
        }

        // function getreIndexUrl() {
        //     return axios.get(IndexUrl, axiosConfig);
        // }



        axios.all([getnewSortUrl(), gethotURL(), getrecommendURL()])
            .then(axios.spread(function(newSort, hot, rem, start) {

                // 推荐游戏请求
                if (rem.data.data) {
                    let remData = rem.data.data
                    remData = _.sortBy(remData, function(item) {
                        return item.hot;
                    });
                    let [remHTML, downLoadHTML, downLoadHTMLlist, logoList, describe, nameHTML, android_download_url, ios_download_url] = ['', '', [],
                        [],
                        [],
                        [],
                        [],
                        []
                    ]
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
                    $('.list_Body').html(remHTML)

                    //模态框加载数据
                    let divList = $("div[data-index]")
                    for (let i = 0; i < divList.length; i++) {
                        divList[i].onclick = function() {
                            let params = [logoList[i], nameHTML[i], describe[i], android_download_url[i], ios_download_url[i]]
                            let modalHTML = modal(params)
                            $('#modal').html(modalHTML)
                        }
                    }
                }

                //  新游请求
                if (newSort.data.data) {
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
                    let imgWrap = $('.content> .left img');

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


                //热游请求
                if (hot.data.data) {
                    const hotData = hot.data.data
                }

                // //开服游戏
                // if (start.data.data) {
                //     let data = start.data.data
                //     console.log(data)
                // }

            }))
    })
} else {
    location.href = './login.html'
}