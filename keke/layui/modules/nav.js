layui.define(['jquery'], function (exports) {
  
  var text = [{
    text: '首页',
    iText: 'fangzi',
  }, {
    text: '游戏',
    iText: 'youxi',
  }, {
    text: '礼包',
    iText: 'libao',
  }, {
    text: '招聘',
    iText: 'xiaoyuanzhaopin',
  }, {
    text: '关于',
    iText: 'guanyu',
  },]
  var navHTML = []
  text.map(function (item, index) {
    console.log(item)
    console.log(index)
    navHTML.push(
      '<li>' +
      '<div>'+item.text+'</div>' +
      '<i class="iconfont icon-'+item.iText+' "></i></li>'
    )
  })
  
  //输出接口
  exports('nav', navHTML);
});