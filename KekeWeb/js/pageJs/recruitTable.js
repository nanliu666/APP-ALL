"use strict";

/*
 * @Author: NaNSix 
 * @Date: 2018-09-25 17:24:38 
 * @Last Modified by: NaNSix
 * @Last Modified time: 2018-10-23 17:36:53
 */
var recruitTableFun = function () {
    $(document).ready(function () {
        if (sessionStorage && sessionStorage.recruit === 'school') {
            document.title = "校园招聘";
        } else {
            document.title = "社会招聘";
        }

        // URL统一管理
        var recruitTypeUrl = '/recruit/type',
            recruitPositionURL = '/recruit/position';

        //传入数据统一管理

        var typeData = [],
            positionData = [];

        // 拼接字符串统一管理

        var headerHTML = '',
            LiHTML = [],
            TbodyAddHTML = [];

        // axios GET参数获取

        var axiosGet = new $axiosGet();
        var axiosConfig = axiosGet.$axiosGetConfig();

        var navAxios = function () {
            axios(recruitTypeUrl, axiosConfig).then(function (result) {
                typeData = result.data.data;
                navLi(typeData);
            }).catch(function (err) {
                console.log(err);
            });
        }();

        // 表格数据请求
        var TBodyAxios = function TBodyAxios(recruit_type_id) {
            if (!!recruit_type_id) {
                //有ID把ID传进去
                axiosConfig = axiosGet.$axiosGetConfig({ 'recruit_type_id': recruit_type_id });
            } else {
                //没有就直接请求所有岗位
                axiosConfig = axiosGet.$axiosGetConfig();
            }
            axios(recruitPositionURL, axiosConfig).then(function (result) {
                positionData = Array.from(new Set(result.data.data));
                TbodyAdd(positionData);
            }).catch(function (err) {
                console.log(err);
            });
        };
        TBodyAxios();

        //添加header
        var headerHTMLAdd = function () {
            headerHTML = "\n                <div class=\"topInfo\">\n                    <a href='./index.html'><img src=\"images/logo (2).png\" class=\"logo\" /></a>\n                    <span style=\"float: right\">\n                                <span class=\"mui-icon mui-icon-contact\" id=\"JSCenter\" style=\"font-size:38px; padding: 10px\"></span>\n                    </span>\n                </div>\n                ";
            $('header').html(headerHTML);
        }();

        // nav导航
        var navLi = function navLi(params) {
            LiHTML[0] = "<li class=\"div25 flexCenterW  active\">\u5168\u90E8</li>";
            for (var i = 0; i < params.length; i++) {
                LiHTML.push("\n                    <li class=\"flexCenterW div25\" data-index='" + params[i].recruit_type_id + "'>" + params[i].recruit_type_name + "</li>\n                ");
            }
            $('nav').html(LiHTML);
            navLiClick();
        };

        var TbodyAdd = function TbodyAdd(params) {
            TbodyAddHTML = [];
            params.map(function (item, index) {
                TbodyAddHTML.push(" <tr recruit_position_id='" + item.recruit_position_id + "'><td>" + item.recruit_position_name + "</td><td>" + item.recruit_type_name + "</td><td>\u9762\u8BAE</td></tr>");
            });
            $('tbody').html(TbodyAddHTML);
            TbodyTdClick();
        };

        var navLiClick = function navLiClick() {
            $("nav li").click(function () {
                var recruit_type_id = $(this).attr('data-index');
                $(this).siblings().removeClass('active');
                $(this).addClass('active');
                TBodyAxios(recruit_type_id);
            });
        };

        var TbodyTdClick = function TbodyTdClick() {
            $('tbody tr').click(function () {
                //这里不用箭头函数，this需要指向tbody
                console.log($(this).attr('recruit_position_id'));
                sessionStorage.setItem('recruit_position_id', $(this).attr('recruit_position_id'));
                location.href = './recruitDetail.html';
            });
        };
        $('#JSCenter').on('click', function () {
            window.location.href = './centerIndex.html';
        });
    });
}();