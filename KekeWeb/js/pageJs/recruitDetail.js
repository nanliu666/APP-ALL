"use strict";

/*
 * @Author: NaNSix 
 * @Date: 2018-09-25 17:22:59 
 * @Last Modified by: NaNSix
 * @Last Modified time: 2018-10-23 17:36:00
 */

var recruitTableFun = function () {
    $(document).ready(function () {
        if (sessionStorage && sessionStorage.recruit === 'school') {
            document.title = "校园招聘";
        } else {
            document.title = "社会招聘";
        }

        var headerHTML = '',
            BodyHTML = '',
            dutyHTML = [],
            requestHTML = [];

        //模拟数据

        var data = {
            name: "Erlang服务端开发工程师",
            duty: ['1、使用erlang独立进行服务端框架设计和功能开发', '2、与策划，客户端沟通，参与游戏功能方案讨论', '3、维护服务器并参与服务端框架调优和性能调优'],
            request: ['1、大专以上学历，计算机或相关专业，1年以上erlang开发经验', '2、精通Erlang编程，无Erlang编程但精通C', '3、熟悉Linux环境，精通数据结构与算法、Socket编程、多线程编程等；', '4、熟悉网络协议及常用数据库，如MySQL的设计、开发与优化；', '5、良好的沟通能力与团队协作能力，高度的工作责任心和敬业精神。', '6、踏实上进，善于钻研技术，富于团队精神，喜欢游戏行业。'],
            contact: ['简历请投递至邮箱：hr@gzzhongwan.net', '或联系公司HR莫小姐：QQ3393214674']

            // axios GET参数获取
        };var axiosGet = new $axiosGet();
        var axiosConfig = axiosGet.$axiosGetConfig();

        //添加header
        var headerHTMLAdd = function () {
            headerHTML = "\n                <div class=\"topInfo\">\n                    <a href='./index.html'><img src=\"images/logo (2).png\" class=\"logo\" /></a>\n                    <span style=\"float: right\">\n                                <span class=\"mui-icon mui-icon-contact\" id=\"JSCenter\" style=\"font-size:38px; padding: 10px\"></span>\n                    </span>\n                </div>\n                ";
            $('header').html(headerHTML);
        }();

        //添加body
        var BodyHTMLAdd = function () {
            BodyHTML = "\n                            <h2>" + data.name + "</h2>\n                            <div class='duty'>\n                            </div>\n                            <div class='request'>\n                            </div>\n                            <div>\n                                <p>\u7B80\u5386\u8BF7\u6295\u9012\u81F3\u90AE\u7BB1\uFF1Ahr@gzzhongwan.net</p>\n                                <p>\u6216\u8054\u7CFB\u516C\u53F8HR\u83AB\u5C0F\u59D0\uFF1AQQ3393214674</p>\n                            </div>\n                            ";
            $('main').html(BodyHTML);
        }();

        var dutyHTMLAdd = function () {
            data.duty.map(function (item) {
                dutyHTML[0] = "<label for=\"\">\u5C97\u4F4D\u804C\u8D23:</label>";
                dutyHTML += "<p>" + item + "</p>";
            });
            $('.duty').html(dutyHTML);
        }();
        var requestHTMLAdd = function () {
            requestHTML[0] = "<label for=\"\">\u4EFB\u804C\u8981\u6C42:</label>";
            data.request.map(function (item) {
                requestHTML += "<p>" + item + "</p>";
            });
            $('.request').html(requestHTML);
        }();

        $('#JSCenter').on('click', function () {
            window.location.href = './centerIndex.html';
        });
    });
}();