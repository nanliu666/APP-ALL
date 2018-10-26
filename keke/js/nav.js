'use strict';

function nav(index) {
    var text = ['首页', '游戏', '礼包', '招聘', '关于'];
    var imgSrc = ['../images/common/index.svg', 'images/common/index_light.svg', 'images/common/game.svg', 'images/common/game_light.svg', 'images/common/gift.svg', 'images/common/gift_light.svg', 'images/common/zhao.svg', 'images/common/zhao_light.svg', 'images/common/about.svg', 'images/common/about_light.svg'];
    var href = ['index.html', 'games.html', 'gifts.html', 'zhao.html', 'about.html'];

    var LiHTMLList = [],
        reciuitNav = '';

    for (var i = 0; i < text.length; i++) {
        LiHTMLList.push('\n            <a class="mui-tab-item"  href="' + href[i] + '">\n                <img src=' + imgSrc[2 * i] + '>\n                <span class="mui-tab-label">' + text[i] + '</span>\n            </a>\n        ');
        if (i === index) {
            LiHTMLList[i] = '\n            <a class="mui-tab-item  actives">\n                <img src=' + imgSrc[2 * i + 1] + '>\n                <span>' + text[i] + '</span>\n            </a>\n            ';
        }
    }
    return LiHTMLList;
}
