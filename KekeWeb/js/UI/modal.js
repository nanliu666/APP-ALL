function modal(params, index) {
    // 礼包开启modal index === 0
    if (index === 0) {
        let [describe, game_name] = params
        console.log('params', params)
        let modalHTML = `
    <div class="modal fade" id="downModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog white_content">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title" id="myModalLabel" style="text-align: center">领取成功</h4>
                </div>
                <div class="modal-body">
                    <div class="modalBody flexCenterH">
                        <p>您已成功领取${game_name}的礼包</p>
                        <p class="describe">CDKEY:${describe}</p>
                    </div>
                </div>
                <div class="modal-footer flexCenterW">
                    <p data-dismiss="modal">我知道了</p>
                </div>
            </div>
        </div>
    </div>
    `
        return modalHTML

    } else {
        // 下载modal
        let [logoList, nameHTML, describe, android_download_url, ios_download_url] = params
        let modalHTML = `
        <div class="modal fade" id="downModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog white_content">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title" id="myModalLabel" style="text-align: center">下载游戏</h4>
                    </div>
                    <div class="modal-body">
                        <div class="modalBody">
                            <div class="top">
                                <div class="left_img">
                                    <img src=${logoList} style="width: 96%;" class="gameImg" />
                                </div>
                                <div class="right_info">
                                    <p class="name">${nameHTML}</p>
                                    <p style="line-height: 1.1rem;">
                                        <img src="images/angle.svg" />
                                        <img src="images/angle.svg" />
                                        <img src="images/angle.svg" />
                                        <img src="images/angle.svg" />
                                        <img src="images/angle.svg" />
                                    </p>
                                    <p class="describe">${describe}</p>
                                </div>
                            </div>
                            <div class="bottom">
                                <a hrf=${android_download_url} class="android"><span><img src="images/android.svg"></span>安卓版下载</a>
                                <a hrf=${ios_download_url} class="iOS"><span><img src="images/iOS.svg"></span>苹果版下载</a>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer flexCenterW">
                        <p data-dismiss="modal">关闭</p>
                    </div>
                </div>
            </div>
        </div>
        `
        return modalHTML
    }

}