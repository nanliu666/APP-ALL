$(function () {
    $(".left>img").attr("src", config.ad1.adviceImg)
    $(".right>img").attr("src", config.ad2.adviceImg)
    $(".left").on("click", function () {
        if (Utils.isAndroid_ios()) {
            if (config.ad1.action == '0') {
                // 下载
                fee.downLoadApk(config.ad1.adr_download_url, config.ad1.adr_game_package_name, config.ad1.game_name)
            } else if (config.ad1.action == '1') {
                // 跳转连接
                fee.openBrowser(config.ad1.adr_targetURL)
            }
        } else {
            // 跳转连接
            window.webkit.messageHandlers.openBrowser.postMessage(config.ad1.ios_targetURL)
        }
    })
    // window.webkit.messageHandlers.openBrowser.postMessage(config.ad2.ios_targetURL)
    $(".right").on("click", function () {
        if (Utils.isAndroid_ios()) {
            if (config.ad2.action == '0') {
                // 下载
                fee.downLoadApk(config.ad2.adr_download_url, config.ad2.adr_game_package_name, config.ad2.game_name)
            } else if (config.ad2.action == '1') {
                // 跳转连接
                fee.openBrowser(config.ad2.adr_targetURL)
            }
        } else {
            window.webkit.messageHandlers.openBrowser.postMessage(config.ad2.ios_targetURL)
        }
    })
})