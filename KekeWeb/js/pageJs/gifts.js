'use strict';

/*
 * @Author: NaNSix 
 * @Date: 2018-09-25 17:24:19 
 * @Last Modified by: NaNSix
 * @Last Modified time: 2018-10-23 17:03:52
 */

$(document).ready(function () {



    // todo 去除滚动条
    var _ref = ['/gift-bag/index', '/gift-bag-user-cdkey/index', parseInt(moment().unix()), 'web'],
        giftListUrl = _ref[0],
        CDKeydURL = _ref[1],
        now_time = _ref[2],
        platform = _ref[3];
    var describe = [],
        game_name = [],
        gift_bag_id = [],
        gift_bag_name = [],
        hot = [],
        CDkeyHTML = [];

    var signObj = {
        now_time: now_time,
        platform: platform
    };
    var sign = getSign(signObj); //调用签名函数获取签名
    var axiosConfig = {
        method: "GET",
        params: {
            now_time: now_time,
            platform: platform,
            sign: sign
        }
    };

    axios(giftListUrl, axiosConfig).then(function (response) {
        var data = response.data.data;
        HTMLAdd(data);
    }).catch(function (error) {
        console.log(error);
    });

    function HTMLAdd(data, index) {
        _.sortBy(data, function (data) {
            return data.hot;
        });
        data.map(function (item, index) {
            describe.push(item.describe);
            game_name.push(item.game_name);
            gift_bag_id.push(item.gift_bag_id);
            gift_bag_name.push(item.gift_bag_name);
            hot.push(item.hot);
        });

        HTMLCreate(data, index);
        $(".giftBox").html(CDkeyHTML);

        //礼包领取
        CDKey(gift_bag_id);

        //模态框加载数据
        modalStart("div[data-index]");
    }

    //礼包领取
    function CDKey(gift_bag_id) {
        if (gift_bag_id && !!gift_bag_id) {
            var giftList = document.querySelectorAll('div[data-index]');

            var _loop = function _loop(i) {
                giftList[i].addEventListener('click', function () {
                    Object.assign(signObj, { gift_bag_id: gift_bag_id[i] });
                    var sign = getSign(signObj); //调用签名函数获取签名
                    var axiosConfig = {
                        method: "GET",
                        params: {
                            now_time: now_time,
                            platform: platform,
                            sign: sign,
                            gift_bag_id: gift_bag_id[i]
                        }
                    };
                    axios(CDKeydURL, axiosConfig).then(function (response) {}).catch(function (error) {
                        console.log(error);
                    });
                }, false);
            };

            for (var i = 0; i < giftList.length; i++) {
                _loop(i);
            }
        } else {
            // layer提示
            mui("#tb1").on('tap', '.gf', function (event) {
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
        var divList = $(NodeList);

        var _loop2 = function _loop2(i) {
            divList[i].onclick = function () {
                var params = [describe[i], game_name[i]];
                var modalHTML = modal(params, 0);
                $('#modal').html(modalHTML);
            };
        };

        for (var i = 0; i < divList.length; i++) {
            _loop2(i);
        }
    }

    function HTMLCreate(data, index) {
        for (var i = 0; i < data.length; i++) {
            CDkeyHTML += '\n                <div class="content" data-index=' + i + '>\n                    <div class="middle" style="width: 69%;margin-left: 4%;">\n                        <div class="left_img">\n                            <img src="images/icon.png" class="imagess" />\n                        </div>\n                        <div class="right_info">\n                            <p class="d_name">' + data[i].game_name + '</p>\n                            <p style="line-height: 1.1rem;">\n                                <img src="images/angle.svg" />\n                                <img src="images/angle.svg" />\n                                <img src="images/angle.svg" />\n                                <img src="images/angle.svg" />\n                                <img src="images/angle.svg" />\n                            </p>\n                            <p class="d_describe">' + data[i].describe + '</p>\n                        </div>\n                    </div>\n                    <div class="right">\n                        <button class="dlBtn gf gift_bag_id" data-toggle="modal" data-target="#downModal">\u9886\u53D6\u793C\u5305</button>\n                    </div>\n                </div>\n                    ';
        }
    }
});
