'use strict';

/*
 * @Author: NaNSix 
 * @Date: 2018-09-25 17:23:54 
 * @Last Modified by: NaNSix
 * @Last Modified time: 2018-10-23 17:32:35
 */
var gameJs = function () {
    $(document).ready(function () {
        // 添加nav
        var navHTML = nav(1);
        $("nav").html(navHTML);

        // 定义url
        var newSortUrl = '/game/new-sort',
            recommendURL = '/game/recommend';
        var downLoadHTML = [],
            hotHTML = [],
            divList = '';
        // axios GET参数获取

        var axiosGet = new $axiosGet();
        var axiosConfig = axiosGet.$axiosGetConfig();

        var getnewSortUrl = function getnewSortUrl() {
            return axios(newSortUrl, axiosConfig);
        };
        var getrecommendURL = function getrecommendURL() {
            return axios(recommendURL, axiosConfig);
        };

        axios.all([getnewSortUrl(), getrecommendURL()]).then(axios.spread(function (newSort, rem) {
            if (!!newSort.data.data && newSort.data.data) {
                HTMLAdd(newSort.data.data, 0);
            }
            if (!!rem.data.data && rem.data.data) {
                HTMLAdd(rem.data.data, 1);
            }
        }));

        var HTMLAdd = function HTMLAdd(data, index) {
            data = _.sortBy(data, function (item) {
                return item.hot;
            });
            HTMLCreate(data, index);
            if (index === 0) {
                $(".downLoad").html(downLoadHTML);

                //模态框加载数据
                divList = $("div[data-indexNEW]");
            } else if (index === 1) {
                $("#tb2").html(hotHTML);

                //模态框加载数据
                divList = $("div[data-indexHot]");
            }

            var _loop = function _loop(i) {
                divList[i].onclick = function () {
                    var params = [data[i].logo, data[i].name, data[i].describe, data[i].android_download_url, data[i].ios_download_url];
                    var modalHTML = modal(params);
                    $('#modal').html(modalHTML);
                };
            };

            for (var i = 0; i < divList.length; i++) {
                _loop(i);
            }
        };

        var HTMLCreate = function HTMLCreate(data, index) {
            for (var i = 0; i < data.length; i++) {
                if (index === 0) {
                    downLoadHTML += '\n                            <div class="content" data-indexNEW=' + i + '>\n                            <div class="middle" style="width: 77%;margin-left: 3%;">\n                                <div class="left_img">\n                                    <img src=' + data[i].logo + ' style="width: 90%;" />\n                                </div>\n                                <div class="right_info">\n                                    <p class="d_name">' + data[i].name + '</p>\n                                    <p style="line-height: 1.1rem;">\n                                        <img src="images/angle.svg" />\n                                        <img src="images/angle.svg" />\n                                        <img src="images/angle.svg" />\n                                        <img src="images/angle.svg" />\n                                        <img src="images/angle.svg" />\n                                    </p>\n                                    <p class="d_describe">' + data[i].describe + '</p>\n                                </div>\n                            </div>\n                            <div class="right">\n                                <button class="dlBtn" data-toggle="modal" data-target="#downModal">\u4E0B\u8F7D</button>\n                            </div>\n                        </div>\n                            ';
                } else {
                    hotHTML += '\n                        <div class="content" data-indexHot=' + i + '>\n                            <div class="left">\n                                <img src=' + data[i].logo + ' />\n                            </div>\n                            <div class="middle">\n                                <div class="left_img">\n                                    <img src="images/icon.png" style="width: 90%;" />\n                                </div>\n                                <div class="right_info">\n                                    <p class="d_name">' + data[i].name + '</p>\n                                    <p style="line-height: 1.1rem;">\n                                        <img src="images/angle.svg" />\n                                        <img src="images/angle.svg" />\n                                        <img src="images/angle.svg" />\n                                        <img src="images/angle.svg" />\n                                        <img src="images/angle.svg" />\n                                    </p>\n                                    <p class="d_describe">' + data[i].describe + '</p>\n                                </div>\n                            </div>\n                            <div class="right">\n                                <button class="dlBtn" data-toggle="modal" data-target="#downModal">\u4E0B\u8F7D</button>\n                            </div>\n                        </div>\n                            ';
                }
            }
        };
    });
}();
