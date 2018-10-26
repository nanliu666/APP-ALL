$(document).ready(function()  {
    //a标签生效
    mui('body').on('tap', 'a', function() {
        window.top.location.href = this.href;
    });


    mui('#tableBox').scroll({});
    mui.init();
    const slider = mui("#slider");
    slider.slider({
        interval: 5000
    });
    $('#JSCenter').on('click', function() {
        window.location.href = './centerIndex.html'
    })

})

function change(e, val) {
    $(e).addClass('active');
    $(e).siblings().removeClass('active');
    if (val === 1) {
        $("#tb1").show();
        $("#tb2").hide();
    } else {
        $("#tb2").show();
        $("#tb1").hide();
    }
}