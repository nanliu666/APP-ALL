function nav(index) {
    const text = ['首页', '游戏', '礼包', '招聘', '关于', ]
    const imgSrc = ['images/common/index.svg', 'images/common/index_light.svg', 'images/common/game.svg',
        'images/common/game_light.svg', 'images/common/gift.svg', 'images/common/gift_light.svg', 'images/common/zhao.svg', 'images/common/zhao_light.svg', 'images/common/about.svg', 'images/common/about_light.svg',
    ]
    const href = ['index.html', 'games.html', 'gifts.html', 'zhao.html', 'about.html', ]

    let LiHTMLList = []
    for (let i = 0; i < text.length; i++) {
        LiHTMLList.push(`
            <a class="mui-tab-item"  href="${href[i]}">
                <img src=${imgSrc[2*i]}>
                <span class="mui-tab-label">${text[i]}</span>
            </a>
        `)
        if (i === index) {
            LiHTMLList[i] =
                `
            <a class="mui-tab-item  actives">
                <img src=${imgSrc[2*i + 1]}>
                <span>${text[i]}</span>
            </a>
            `
        }
    }



    console.log(LiHTMLList)
    return LiHTMLList
}