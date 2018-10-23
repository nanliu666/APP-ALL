/*
 * @Author: NaNSix 
 * @Date: 2018-09-25 17:23:54 
 * @Last Modified by: NaNSix
 * @Last Modified time: 2018-10-23 17:32:35
 */
const gameJs = (() => {
        $(document).ready(() => {
            // 添加nav
            const navHTML = nav(1)
            $("nav").html(navHTML)

            // 定义url
            const [newSortUrl, recommendURL, ] = ['/game/new-sort', '/game/recommend']
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
                return axios(recommendURL, axiosConfig);
            })


            axios.all([getnewSortUrl(), getrecommendURL(), ])
                .then(axios.spread((newSort, rem) => {
                    if (!!newSort.data.data && newSort.data.data) {
                        HTMLAdd(newSort.data.data,  0)
                    }
                    if (!!rem.data.data && rem.data.data) {
                        HTMLAdd(rem.data.data, 1)
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
                        const params = [data[i].logo, data[i].name, data[i].describe, data[i].android_download_url, data[i].ios_download_url, ]
                        const modalHTML = modal(params)
                        $('#modal').html(modalHTML)
                    }
                }
            })

            const HTMLCreate = ((data, index) => {
                for (let i = 0; i < data.length; i++) {
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
})()