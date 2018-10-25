'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

$(document).ready(function () {

    var _ref = ['/game/new-sort', '/game-server/index', '/game/recommend', '/gift-bag-user-cdkey/index', parseInt(moment().unix()), 'web'],
        newSortUrl = _ref[0],
        IndexUrl = _ref[1],
        recommendURL = _ref[2],
        CDKeydURL = _ref[3],
        now_time = _ref[4],
        platform = _ref[5];

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

        //变量统一管理
    };var remHTML = '',
        openHTML = [];
    var newGameHTML = '',
        imgSrcArr = ['images/one.png', 'images/two.png', 'images/three.png'],
        gift_bag_id = [];
    // URL请求

    var getnewSortUrl = function getnewSortUrl() {
        return axios(newSortUrl, axiosConfig);
    };

    var getrecommendURL = function getrecommendURL() {
        return axios(recommendURL, axiosConfig);
    };

    var getIndexUrl = function getIndexUrl() {
        return axios(IndexUrl, axiosConfig);
    };

    //礼包领取
    var CDKey = function CDKey(gift_bag_id) {
        var giftList = document.querySelectorAll('.gift_bag_id');
        if (gift_bag_id && !!gift_bag_id) {
            var _loop = function _loop(i) {
                giftList[i].addEventListener('click', function () {
                    Object.assign(signObj, {
                        gift_bag_id: gift_bag_id[i]
                    });
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
                    axios(CDKeydURL, axiosConfig).then(function (response) {
                        var data = response.data;
                        console.log("礼包data=>", data);
                        //  获取礼包ID后去获取CDKEY
                        modalStart("td[data-indexCD]", 0, data);
                    }).catch(function (error) {
                        console.log(error);
                    });
                }, false);
            };

            for (var i = 0; i < giftList.length; i++) {
                _loop(i);
            }
        } else {
            // 无礼包时layer提示
            mui("#tb1").on('tap', '.gf', function (event) {
                layer.open({
                    content: '暂无礼包领取',
                    skin: 'msg',
                    time: 2 //2秒后自动关闭
                });
            });
        }
    };

    // 开启模态框
    var modalStart = function modalStart(NodeList, index, data) {
        //模态框加载数据
        var divList = $(NodeList);

        //礼包modal开启
        if (index === 0) {
            (function () {
                var _data = _slicedToArray(data, 1),
                    game_name = _data[0];

                var _loop2 = function _loop2(i) {
                    divList[i].onclick = function () {

                        // FIX 同一个礼包接口返回不同数据要求后端处理
                        var params = [describe[i], game_name[i]];
                        var modalHTML = modal(params, 0);
                        $('#modal').html(modalHTML);
                    };
                };

                for (var i = 0; i < divList.length; i++) {
                    _loop2(i);
                }
            })();
        } else {
            var _loop3 = function _loop3(i) {
                divList[i].onclick = function () {
                    var params = [data[i].logo, data[i].name, data[i].describe, data[i].android_download_url, data[i].ios_download_url];
                    var modalHTML = modal(params);
                    $('#modal').html(modalHTML);
                };
            };

            //下载modal开启
            for (var i = 0; i < divList.length; i++) {
                _loop3(i);
            }
        }
    };

    // HTML创建
    var HTMLCreate = function HTMLCreate(remData) {
        for (var i = 0; i < remData.length; i++) {
            remHTML += '\n                <div class="list_content" data-toggle="modal" data-target="#downModal" data-index=' + i + '>\n                    <div class="left_img">\n                        <img src="' + remData[i].logo + '" />\n                    </div>\n                    <div class="right_info">\n                        <p>' + remData[i].name + '<img src="images/free.png" class="icon"></p>\n                        <p>\n                            <img src="images/angle.svg" />\n                            <img src="images/angle.svg" />\n                            <img src="images/angle.svg" />\n                            <img src="images/angle.svg" />\n                            <img src="images/angle.svg" />\n                        </p>\n                        <p>' + remData[i].describe + '</p>\n                    </div>\n                </div>\n                ';
        }
    };
    axios.all([getnewSortUrl(), getrecommendURL(), getIndexUrl()]).then(axios.spread(function (newSort, rem, start) {

        // 推荐游戏请求
        if (!!rem.data.data && rem.data.data) {
            var remData = rem.data.data;
            remData = _.sortBy(remData, function (item) {
                return item.hot;
            });

            HTMLCreate(remData);
            $('.list_Body').html(remHTML);

            //模态框加载数据
            modalStart("div[data-index]", 1, remData);
        }

        //  新游请求
        if (!!newSort.data.data && newSort.data.data) {
            (function () {
                var data = newSort.data.data;
                data = _.sortBy(data, function (item) {
                    return item.hot;
                });

                for (var i = 0; i < data.length; i++) {
                    newGameHTML += '\n                                    <div class="content"  data-indexNEW=' + i + '>\n                                        <div class="left">\n                                            <img src = "images/one.png"/>\n                                        </div>\n                                        <div class="middle">\n                                            <div class="left_img">\n                                                <img src="' + data[i].logo + '" style="width: 90%;" />\n                                            </div>\n                                            <div class="right_info">\n                                                <p class="d_name">' + data[i].name + '</p>\n                                                <p style="line-height: 1.1rem;">\n                                                    <img src="images/angle.svg" />\n                                                    <img src="images/angle.svg" />\n                                                    <img src="images/angle.svg" />\n                                                    <img src="images/angle.svg" />\n                                                    <img src="images/angle.svg" />\n                                                </p>\n                                                <p class="d_describe">' + data[i].describe + '</p>\n                                            </div>\n                                        </div>\n                                        <div class="right">\n                                            <button class="dlBtn" data-toggle="modal" data-target="#downModal">\u4E0B\u8F7D</button>\n                                        </div>\n                                    </div>\n                                ';
                }
                $("#tb2").html(newGameHTML);

                //添加图片
                var imgWrap = $('.content .left img');

                var preloadImg = function (arr) {
                    for (var i = 0; i < arr.length; i++) {
                        imgWrap[i].src = arr[i];
                    }
                }(imgSrcArr);

                //模态框加载数据
                var divList = $("div[data-indexNEW]");

                var _loop4 = function _loop4(_i) {
                    divList[_i].onclick = function () {
                        var params = [data[_i].logo, data[_i].name, data[_i].describe, data[_i].android_download_url, data[_i].ios_download_url];
                        var modalHTML = modal(params);
                        $('#modal').html(modalHTML);
                    };
                };

                for (var _i = 0; _i < divList.length; _i++) {
                    _loop4(_i);
                }
            })();
        }

        //开服游戏
        if (!!start.data.data && start.data.data) {
            (function () {
                var data = start.data.data;
                _.sortBy(data, function (item) {
                    return item.opening_time;
                });
                for (var i = 0; i < data.length; i++) {
                    gift_bag_id.push(data[i].gift_bag_id);
                    openHTML.push('\n                            <tr >\n                                <td>' + data[i].name + '</td>\n                                <td>' + data[i].opening_time + '</td>\n                                <td class=\'gift_bag_id\' data-indexCD=' + i + '><img src="images/gf.svg" class="gf" data-toggle="modal" data-target="#downModal"></td>\n                                <td data-indexNEW=' + i + '><img src="images/download.svg"  data-toggle="modal" data-target="#downModal"></td>\n                            </tr>\n                        ');
                }
                $("tbody").html(openHTML);
                var divList = $("td[data-indexNEW]");

                var _loop5 = function _loop5(_i2) {
                    divList[_i2].onclick = function () {
                        var params = [data[_i2].game_server_id, data[_i2].name, data[_i2].gift_bag_id, data[_i2].android_download_url, data[_i2].ios_download_url];
                        var modalHTML = modal(params);
                        $('#modal').html(modalHTML);
                    };
                    //礼包领取逻辑
                };

                for (var _i2 = 0; _i2 < divList.length; _i2++) {
                    _loop5(_i2);
                }
                CDKey(gift_bag_id);
            })();
        }
    }));
});
