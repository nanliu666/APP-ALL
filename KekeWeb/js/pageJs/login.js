'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/*
 * @Author: NaNSix 
 * @Date: 2018-09-25 17:24:57 
 * @Last Modified by: NaNSix
 * @Last Modified time: 2018-10-23 17:34:38
 */
$(document).ready(function () {
    $("#passwordForm ").bootstrapValidator({
        fields: {
            username: {
                validators: {
                    notEmpty: {
                        message: '账号不能为空'
                    }
                }
            },
            password: {
                validators: {
                    notEmpty: {
                        message: '密码不能为空'
                    },
                    stringLength: {
                        min: 6,
                        max: 18,
                        message: '密码长度应该处于6-18位'
                    }
                }
            }
        }
    })
    // 验证成功后登陆
    .on('success.form.bv', function (e) {
        e.preventDefault();
        axios.defaults.baseURL = 'http://192.168.2.159:7002';
        axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
        var errHTML = '<p data-bv-validator="notEmpty" data-bv-validator-for="password" class="help-block">\u8D26\u53F7\u6216\u8005\u5BC6\u7801\u9519\u8BEF</p>';
        var _ref = [$('#JSusername').val(), $('#JSpassword').val(), '/site/login', parseInt(moment().unix()), 'web', "index.html"],
            account = _ref[0],
            password = _ref[1],
            url = _ref[2],
            now_time = _ref[3],
            platform = _ref[4],
            href = _ref[5];

        var signObj = {
            now_time: now_time,
            platform: platform,
            password: password,
            account: account
        };
        var sign = getSign(signObj); //调用签名函数获取签名
        var axiosConfig = {
            method: 'post',
            url: url,
            headers: {
                'Content-type': 'application/x-www-form-urlencoded'
            },
            data: _extends({}, signObj, {
                sign: sign
            }),
            transformRequest: [function (data) {
                var ret = '';
                for (var it in data) {
                    ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&';
                }
                return ret;
            }]
        };

        axios(axiosConfig).then(function (result) {
            var data = result.data;
            if (data.state === "success") {
                sessionStorage.setItem("loginSuccess", data.state);
                location.href = href;
            } else {
                $("#JSLogin").removeAttr('disabled');
                $("input[name='password']").parent().parent().addClass("has-error");
                if ($("input[name='password']").siblings().length === 0) {
                    $("input[name='password']").parent().append(errHTML);
                } else {
                    // 重新输入时恢复enter
                    document.onkeydown = function (event) {
                        if (event && event.keyCode === 13) {
                            $("input[name= 'password']").submit();
                        }
                    };
                }
            }
        }).catch(function (err) {
            console.log(err.config);
        });
    });
});

// 重新输入时移除错误提示
$("input[name='password']").on("input", function (e) {
    $("input[name='password']").siblings().remove();
});