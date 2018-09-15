if (sessionStorage.loginSuccess && sessionStorage.loginSuccess === 'success') {
    $(document).ready(() => {
        mui('body').on('tap', 'a', function() {
            document.location.href = this.href;
        });
        mui.init();
        let width = document.body.clientWidth;
        if (width <= 320) {
            $(".white_content").css("height", "50%");
            $(".white_content").css("top", "25%");
        }
        $('#JSCenter').on('click', function() {
            window.location.href = './centerIndex.html'
        })


        // 定义url
        const [newSortUrl, recommendURL, type] = ['/game/new-sort', '/game/recommend', '/recruit/type']
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
        const axiosConfig = $axiosGet()

        function getnewSortUrl() {
            return axios.get(newSortUrl, axiosConfig);
        }

        function getType() {
            return axios.get(type, axiosConfig);
        }


        function getrecommendURL() {
            return axios.get(recommendURL, axiosConfig);
        }


        axios.all([getnewSortUrl(), getrecommendURL(), getType()])
            .then(axios.spread(function(newSort, rem) {
                if (newSort.data.data) {
                    HTMLAdd(newSort.data.data, index = 0)
                }
                if (rem.data.data) {
                    HTMLAdd(rem.data.data, index = 1)
                }
                if (type.data.data) {
                    console.log(type.data.data)
                }
            }))

        function HTMLAdd(data, index) {
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
        }

        function HTMLCreate(data, index) {
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
        }

    })
} else {
    location.href = './login.html'
}