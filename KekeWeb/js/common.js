//a标签生效
mui('body').on('tap','a',function(){
    window.top.location.href=this.href;
});

//tab切换
function change(e,val){
	$(e).addClass('active');
	$(e).siblings().removeClass('active');
	if(val === 1){
		$("#tb1").show();
		$("#tb2").hide();
	}else{
		$("#tb2").show();
		$("#tb1").hide();
	}
}