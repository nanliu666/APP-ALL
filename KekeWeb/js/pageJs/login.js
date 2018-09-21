$(document).ready(function() {
    foo();
    $("#passwordForm ")
        .bootstrapValidator({
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
                        },
                    }
                },
            }
        })
        // 验证成功后登陆
        .on('success.form.bv', function(e) {
            e.preventDefault()
            axios.defaults.baseURL = 'http://192.168.2.159:7002';
            axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
            const errHTML = `<p data-bv-validator="notEmpty" data-bv-validator-for="password" class="help-block">账号或者密码错误</p>`
            const [account, password, url, now_time, platform, href, ] = [$('#JSusername').val(), $('#JSpassword').val(), '/site/login', parseInt(moment().unix()), 'web', "index.html", ]
            const signObj = {
                now_time,
                platform,
                password,
                account,
            }
            const sign = getSign(signObj) //调用签名函数获取签名
            const axiosConfig = {
                method: 'post',
                url,
                headers: {
                    'Content-type': 'application/x-www-form-urlencoded'
                },
                data: {
                    ...signObj,
                    sign,
                },
                transformRequest: [function(data) {
                    let ret = ''
                    for (let it in data) {
                        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                    }
                    return ret
                }],
            }

            axios(axiosConfig)
                .then((result) => {
                    const data = result.data
                    if (data.state === "success") {
                        sessionStorage.setItem("loginSuccess", data.state)
                        location.href = href
                    } else {
                        $("#JSLogin").removeAttr('disabled')
                        $("input[name='password']").parent().parent().addClass("has-error");
                        if ($("input[name='password']").siblings().length === 0) {
                            $("input[name='password']").parent().append(errHTML);
                        } else {
                            // 重新输入时恢复enter
                            document.onkeydown = function(event) {
                                if (event && event.keyCode === 13) {
                                    $("input[name= 'password']").submit()
                                }
                            }
                        }
                    }
                })
                .catch((err) => {
                    console.log(err.config)
                })
        })
})

// 重新输入时移除错误提示
$("input[name='password']").on("input", (e) => {
    $("input[name='password']").siblings().remove()
})