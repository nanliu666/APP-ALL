const gameJs = (() => {
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
            const navHTML = nav(1)
            $("nav").html(navHTML)

            // 定义url
            const [newSortUrl, recommendURL, ] = ['/game/new-sort', '/game/recommend']
            let [android_download_url, describe, game_id, hot, ios_download_url, logo, name, ] = [
                [],
                [],
                [],
                [],
                [],
                [],
                [],
            ]
            let [downLoadHTML, hotHTML, divList] = [
                [],
                [], ''
            ]
            // axios GET参数获取
            const axiosGet = new $axiosGet()
            const axiosConfig = axiosGet.$axiosGetConfig()

            const getnewSortUrl = (() => {
                return axios(newSortUrl, axiosConfig);
            })
            const getrecommendURL = (() => {
                return axios(newSortUrl, axiosConfig);
            })


            axios.all([getnewSortUrl(), getrecommendURL(), ])
                .then(axios.spread((newSort, rem) => {
                    if (newSort.data.data) {
                        console.log(newSort.data.data)
                        HTMLAdd(newSort.data.data, index = 0)
                    }
                    if (rem.data.data) {
                        HTMLAdd(rem.data.data, index = 1)
                    }
                }))

            const HTMLAdd = ((data, index) => {
                data = _.sortBy(data, function(item) {
                    return item.hot;
                });
                HTMLCreate(data, index)
                if (index === 0) {

                    $(".downLoad").html(downLoadHTML)

                    //模态框加载数据
                    divList = $("div[data-indexNEW]")
                } else if (index === 1) {
                    $("#tb2").html(hotHTML)

                    //模态框加载数据
                    divList = $("div[data-indexHot]")
                }
                for (let i = 0; i < divList.length; i++) {
                    divList[i].onclick = function() {
                        let params = [logo[i], name[i], describe[i], android_download_url[i], ios_download_url[i]]
                        let modalHTML = modal(params)
                        $('#modal').html(modalHTML)
                    }
                }
            })
            const HTMLCreate = ((data, index) => {
                for (let i = 0; i < data.length; i++) {
                    android_download_url.push(data[i].android_download_url)
                    describe.push(data[i].describe)
                    game_id.push(data[i].game_id)
                    hot.push(data[i].hot)
                    ios_download_url.push(data[i].ios_download_url)
                    logo.push(data[i].logo)
                    name.push(data[i].name)
                    if (index === 0) {
                        downLoadHTML += `
                            <div class="content" data-indexNEW=${i}>
                            <div class="middle" style="width: 77%;margin-left: 3%;">
                                <div class="left_img">
                                    <img src=${data[i].logo} style="width: 90%;" />
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
                    } else {
                        hotHTML += `
                        <div class="content" data-indexHot=${i}>
                            <div class="left">
                                <img src=${data[i].logo} />
                            </div>
                            <div class="middle">
                                <div class="left_img">
                                    <img src="images/icon.png" style="width: 90%;" />
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
                    }
                }
            })
        })
    } else {
        location.href = './login.html'
    }
})()