let changeSelect
if (sessionStorage.loginSuccess && sessionStorage.loginSuccess === 'success') {
    $(document).ready(() => {
        $(function() {
            var counter = 0;
            // 每页展示4个
            var num = 4;
            var pageStart = 0,
                pageEnd = 0;



            const [type] = ['/recruit/type']
            const axiosConfig = $axiosGet()
            axios.get(type, axiosConfig)
                .then((result) => {
                    console.log(result)
                }).catch((err) => {
                    console.log(err)
                });

            // 上拉刷新，下拉加载
            $('.inner').dropload({
                scrollArea: window,
                domUp: {
                    domClass: 'dropload-up',
                    domRefresh: '<div class="dropload-refresh">↓下拉刷新</div>',
                    domUpdate: '<div class="dropload-update">↑释放更新</div>',
                    domLoad: '<div class="dropload-load"><span class="loading"></span>加载中...</div>'
                },
                domDown: {
                    domClass: 'dropload-down',
                    domRefresh: '<div class="dropload-refresh">↑上拉加载更多</div>',
                    domLoad: '<div class="dropload-load"><span class="loading"></span>加载中...</div>',
                    domNoData: '<div class="dropload-noData">暂无数据</div>'
                },
                loadUpFn: function(me) {
                    axios.get(type, axiosConfig)
                        .then((result) => {
                            console.log(result)
                        }).catch((err) => {
                            console.log(err)
                        });
                    // $.ajax({
                    //     type: 'GET',
                    //     url: 'http://192.168.2.159:7002/recruit/type',
                    //     dataType: 'json',
                    //     success: function(data) {
                    //         var result = '';
                    //         for (var i = 0; i < data.lists.length; i++) {
                    //             result += '<tr>' +
                    //                 '<td>' + data.lists[i].job + '</td>' +
                    //                 '<td>' + data.lists[i].type + '</td>' +
                    //                 '<td>' + data.lists[i].money + '</td>'
                    //             '</tr>';
                    //         }
                    //         // 为了测试，延迟1秒加载
                    //         setTimeout(function() {
                    //             $('.table tbody').prepend(result);
                    //             // 每次数据加载完，必须重置
                    //             me.resetload();
                    //             // 重置索引值，重新拼接more.json数据
                    //             counter = 0;
                    //         }, 1000);
                    //     },
                    //     error: function(xhr, type) {
                    //         // alert('Ajax error!');
                    //         // 即使加载出错，也得重置
                    //         me.resetload();
                    //     }
                    // });
                },
                loadDownFn: function(me) {
                    // $.ajax({
                    //     type: 'GET',
                    //     url: 'http://192.168.2.159:7002/recruit/type',
                    //     dataType: 'json',
                    //     success: function(data) {
                    //         var result = '';
                    //         counter++;
                    //         pageEnd = num * counter;
                    //         pageStart = pageEnd - num;

                    //         for (var i = pageStart; i < pageEnd; i++) {
                    //             result += '<tr>' +
                    //                 '<td>' + data.lists[i].job + '</td>' +
                    //                 '<td>' + data.lists[i].type + '</td>' +
                    //                 '<td>' + data.lists[i].money + '</td>'
                    //             '</tr>';
                    //             if ((i + 1) >= data.lists.length) {
                    //                 // 锁定
                    //                 me.lock();
                    //                 // 无数据
                    //                 me.noData();
                    //                 break;
                    //             }
                    //         }
                    //         // 为了测试，延迟1秒加载
                    //         setTimeout(function() {
                    //             $('.table tbody').append(result);
                    //             // 每次数据加载完，必须重置
                    //             me.resetload();
                    //         }, 1000);
                    //     },
                    //     error: function(xhr, type) {
                    //         // alert('Ajax error!');
                    //         // 即使加载出错，也得重置
                    //         me.resetload();
                    //     }
                    // });
                },
                threshold: 50
            });
        });

        changeSelect = function(e, val) {
            $(e).addClass('active');
            $(e).siblings().removeClass('active');
            //	该出请求ajax数据,点击tab切换,获取获取对应类型的数据渲染到页面。
            // $.ajax({
            // 	type:"get",
            // 	data:{
            // 		// 此处 点击tab传参给后端，
            // 	}
            // 	url:"",
            // 	async:true,
            // 	success:function(res){
            // 		// 渲染返回参数到页面
            // 	},
            // 	error:function(err){
            // 		//  请求出错提示
            // 	}
            // });
        }
        $('#JSCenter').on('click', function() {
            window.location.href = './centerIndex.html'
        })
    })
} else {
    location.href = './login.html'
}