//模拟数据
let stroeDataLi = {
  storeID: 1,
  storeNum: 66,
  storeName: '商城名称1',
  storeChangeNumber: 1, //1 单词兑换数量
  storeRepertory: 1, // 商品库存
  storeDayNumber: 1, // 每天兑换数量
  storeIcon: 'icon.con', // 商品图标
  storeType: 1, // 商品类型
  storeCurrency: 'RMB', // 兑换货币
  storeCurrencyNum: 1, // 兑换货币数量
  storeDes: 1, // 商品描述
}
let stroeData = []
stroeData.push(stroeDataLi) //推进数据
let storeList = [] //html列表数组
// html列表数组添加数据
const storeAddHTML = function () {
  for (let i = 0; i < stroeData.length; i++) {
    storeList.push(
      `
    <div class="stroeList borderTop marginTop10 ">
    <div class="row margin10">
      <div class="col-6  input-group">
        <label for="" class="flex-end input-group-addon col-3">商品编号:</label>
        <input type="text" class="form-control col-6" name="storeID">
      </div>
      <div class="col-6  input-group">
        <label for="" class="flex-end input-group-addon col-3">商品排序序号:</label>
        <input type="text" class="form-control col-6" name="storeNum"></div>
    </div>
    <div class="row margin10">
      <div class="col-6  input-group">
        <label for="" class="flex-end input-group-addon col-3">商品名称:</label>
        <input type="text" class="form-control col-6" name="storeName"></div>
      <div class="col-6  input-group"><label for="" class="flex-end input-group-addon col-3">单词兑换数量:</label>
      <input type="text" name="storeChangeNumber" class="form-control col-6"></div>
    </div>
    <div class="row margin10">
      <div class="col-6  input-group">
        <label for="" class="flex-end input-group-addon col-3">商品库存:</label>
        <input type="text" class="form-control col-6" name="storeChangeNumber"></div>
      <div class="col-6  input-group"><label for="" class="flex-end input-group-addon col-3">每天兑换数量:</label>
      <input type="text" class="form-control col-6" name="storeChangeNumber"></div>
    </div>
    <div class="row margin10">
      <div class="col-6  input-group">
        <label for="" class="flex-end input-group-addon col-3">商品图标:</label>
        <input type="text" class="form-control col-6"  name="storeIcon">
      </div>
      <div class="col-6  input-group">
        <label for="" class="flex-end input-group-addon col-3">商品类型: </label>
        <input type="text" class="form-control col-6" name="storeType">
      </div>
    </div>
    <div class="row margin10">
      <div class="col-6  input-group">
        <label for="" class="flex-end input-group-addon col-3">兑换货币:</label>
        <input type="text" class="form-control col-6"  name="storeCurrency"></div>
      <div class="col-6  input-group">
        <label for="" class="flex-end input-group-addon col-3">兑换货币数量:</label>
        <input type="text" class="form-control col-6"  name="storeCurrencyNum"></div>
    </div>
    <div class="row margin20">
      <div class="col-12  input-group padding60">
        <label for="" class="input-group-addon flexHcenter">商品描述:</label>
        <textarea class="form-control margin18" rows="3"  name="storeDes"></textarea>
      </div>
    </div>
    <div class="row marginBootom20">
      <div class="col-4 offset-md-6 flexspaceAround">
        <button type="button" class="btn btn-info button-width" onclick="formData(${i})">保存本商品</button>
        <button type="button" class="btn btn-danger button-width" onclick="removeHTML(${i})">删除新商品</button>
      </div>
    </div>
  </div>
      `
    )
  }
}

storeAddHTML()
$('.js-main').html(storeList)

//获取表单内数据
const formData = function (i = 0) {
  console.log(i)
  var formD = {};
  var t = $('form').serializeArray();
  $.each(t, function () {
    formD[this.name] = this.value;
  });
  sessionStorage.setItem('formData', JSON.stringify(formD))
}

// 表单失焦保存
$('input, textarea').blur(function () {
  formData()
});
//添加新商品
$(".js-addNewStore").on('click', function () {
  stroeData.push(stroeDataLi) //推进数据
  storeList = []

  storeAddHTML()
  $('.js-main').html(storeList)
})

Array.prototype.remove = function (from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};
// 删除列表
const removeHTML = function (i) {
  console.log(1)
  stroeData.remove(i)
  storeList.remove(i)
  $('.js-main').html(storeList)
}