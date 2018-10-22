'use strict';

var stroeData = 1;
var storeList = []; //html列表数组
// html列表数组添加数据
var storeAddHTML = function storeAddHTML() {
  for (var i = 0; i < stroeData; i++) {
    storeList.push('\n      <div class="shopLi' + i + '">\n        <div class="stroeList borderTop marginTop10 ">\n        <div class="row margin10">\n          <div class="col-6  input-group">\n            <label for="" class="flex-end input-group-addon col-3">\u5546\u54C1\u7F16\u53F7:</label>\n            <input type="text" class="form-control col-6" name="storeID' + i + '">\n          </div>\n          <div class="col-6  input-group">\n            <label for="" class="flex-end input-group-addon col-3">\u5546\u54C1\u6392\u5E8F\u5E8F\u53F7:</label>\n            <input type="text" class="form-control col-6" name="storeNum' + i + '"></div>\n        </div>\n        <div class="row margin10">\n          <div class="col-6  input-group">\n            <label for="" class="flex-end input-group-addon col-3">\u5546\u54C1\u540D\u79F0:</label>\n            <input type="text" class="form-control col-6" name="storeName' + i + '"></div>\n          <div class="col-6  input-group"><label for="" class="flex-end input-group-addon col-3">\u5355\u8BCD\u5151\u6362\u6570\u91CF:</label>\n          <input type="text" name="storeChangeNumber' + i + '" class="form-control col-6"></div>\n        </div>\n        <div class="row margin10">\n          <div class="col-6  input-group">\n            <label for="" class="flex-end input-group-addon col-3">\u5546\u54C1\u5E93\u5B58:</label>\n            <input type="text" class="form-control col-6" name="storeLeftNumber' + i + '"></div>\n          <div class="col-6  input-group"><label for="" class="flex-end input-group-addon col-3">\u6BCF\u5929\u5151\u6362\u6570\u91CF:</label>\n          <input type="text" class="form-control col-6" name="storeDayNumber' + i + '"></div>\n        </div>\n        <div class="row margin10">\n          <div class="col-6  input-group">\n            <label for="" class="flex-end input-group-addon col-3">\u5546\u54C1\u56FE\u6807:</label>\n            <input type="text" class="form-control col-6"  name="storeIcon' + i + '">\n          </div>\n          <div class="col-6  input-group">\n            <label for="" class="flex-end input-group-addon col-3">\u5546\u54C1\u7C7B\u578B: </label>\n            <input type="text" class="form-control col-6" name="storeType' + i + '">\n          </div>\n        </div>\n        <div class="row margin10">\n          <div class="col-6  input-group">\n            <label for="" class="flex-end input-group-addon col-3">\u5151\u6362\u8D27\u5E01:</label>\n            <input type="text" class="form-control col-6"  name="storeCurrency' + i + '"></div>\n          <div class="col-6  input-group">\n            <label for="" class="flex-end input-group-addon col-3">\u5151\u6362\u8D27\u5E01\u6570\u91CF:</label>\n            <input type="text" class="form-control col-6"  name="storeCurrencyNum' + i + '"></div>\n        </div>\n        <div class="row margin20">\n          <div class="col-12  input-group padding60">\n            <label for="" class="input-group-addon flexHcenter">\u5546\u54C1\u63CF\u8FF0:</label>\n            <textarea class="form-control margin18" rows="3"  name="storeDes' + i + '"></textarea>\n          </div>\n        </div>\n        <div class="row marginBootom20">\n          <div class="col-4 offset-md-6 flexspaceAround">\n            <button type="button" class="btn btn-info button-width">\u4FDD\u5B58\u672C\u5546\u54C1</button>\n            <button type="button" class="btn btn-danger button-width" onclick="removeHTML(' + i + ')">\u5220\u9664\u65B0\u5546\u54C1</button>\n          </div>\n        </div>\n      </div>\n    </div>\n      ');
  }
};
//保存数据
var dataAddIn = function dataAddIn() {
  var formData = JSON.parse(sessionStorage.getItem('formData'));
  for (var i = 0; i < stroeData; i++) {
    $('[name=storeChangeNumber' + i + ']').val(formData['storeChangeNumber' + i]);
    $('[name=storeID' + i + ']').val(formData['storeID' + i]);
    $('[name=storeNum' + i + ']').val(formData['storeNum' + i]);
    $('[name=storeType' + i + ']').val(formData['storeType' + i]);
    $('[name=storeName' + i + ']').val(formData['storeName' + i]);
    $('[name=storeLeftNumber' + i + ']').val(formData['storeLeftNumber' + i]);
    $('[name=storeDayNumber' + i + ']').val(formData['storeDayNumber' + i]);
    $('[name=storeIcon' + i + ']').val(formData['storeIcon' + i]);
    $('[name=storeCurrency' + i + ']').val(formData['storeCurrency' + i]);
    $('[name=storeCurrencyNum' + i + ']').val(formData['storeCurrencyNum' + i]);
    $('[name=storeDes' + i + ']').val(formData['storeDes' + i]);
  }
};
var dataSave = function dataSave() {
  var formD = {};
  var t = $('form').serializeArray();
  $.each(t, function () {
    formD[this.name] = this.value;
  });
  sessionStorage.setItem('formData', JSON.stringify(formD));
};

storeAddHTML();
dataAddIn();
$('.js-main').html(storeList);

//添加新商品
$(".js-addNewStore").on('click', function () {
  storeList = [];
  stroeData += 1;
  storeAddHTML();
  $('.js-main').html(storeList);
  dataAddIn();
});

Array.prototype.remove = function (from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};

// 删除列表
var removeHTML = function removeHTML(i) {
  stroeData -= 1;
  storeList.remove(i);
  $('.js-main').html(storeList);
  dataAddIn();
  dataSave();
};

//动态生成 事件失焦失败解决
$(document).delegate("input, textarea", "blur", function () {
  dataSave();
});

// 重置表格所有数据
$("#formReset").on('click', function () {
  formReset();
  dataSave();
});
var formReset = function formReset() {
  for (var i = 0; i < stroeData; i++) {
    $('[name=storeChangeNumber' + i + ']').val('');
    $('[name=storeID' + i + ']').val('');
    $('[name=storeNum' + i + ']').val('');
    $('[name=storeType' + i + ']').val('');
    $('[name=storeName' + i + ']').val('');
    $('[name=storeLeftNumber' + i + ']').val('');
    $('[name=storeDayNumber' + i + ']').val('');
    $('[name=storeIcon' + i + ']').val('');
    $('[name=storeCurrency' + i + ']').val('');
    $('[name=storeCurrencyNum' + i + ']').val('');
    $('[name=storeDes' + i + ']').val('');
  }
};
