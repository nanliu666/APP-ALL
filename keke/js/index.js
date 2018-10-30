$(document).ready(function () {
  var deviceWidth = document.documentElement.clientWidth;
  if (deviceWidth > 640) deviceWidth = 640;
  document.documentElement.style.fontSize = deviceWidth / 6.4 + 'px';


  layui.use(['carousel', 'element', 'nav'], function () {
    var carousel = layui.carousel;
    var element = layui.element;
    var nav = layui.nav;

    // nav.render(0)
    console.log(nav)
    //建造实例
    carousel.render({
      elem: '#carousel',
      width: '100%', //设置容器宽度,
      height: "200px",
      arrow: 'none', //始终显示箭头
      anim: 'fade', //切换动画方式
      interval: '3000', //切换动画方式
      arrow: "hover",
    });


    //获取hash来切换选项卡，假设当前地址的hash为lay-id对应的值
    var layid = location.hash.replace(/^#test1=/, '');
    element.tabChange('test1', layid);
  });

  $('.navbar').on('click', 'li', function () {
    $(this).addClass('actives').siblings().removeClass('actives')
  })
})