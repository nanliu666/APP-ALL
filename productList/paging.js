'use strict';

var stroeData = 1;
var storeList = [];
var storeAddHTML = function storeAddHTML() {
  for (var i = 0; i < stroeData; i++) {
    storeList.push('\n      <div class="shopLi' + i + '">\n      <div class=" stroeList borderTop marginTop10 ">\n        <div class="row margin10">\n          <div class="col-6  input-group">\n            <label for="" class="flex-end input-group-addon col-3">\u5546\u54C1\u7F16\u53F7:</label>\n            <input type="text" class="form-control col-6"  name="storeID' + i + '">\n            </div>\n            <div class="col-6  input-group">\n            <label for="" class="flex-end input-group-addon col-3">\u5546\u57CE\u6392\u5E8F\u5E8F\u53F7:</label>\n            <input type="text" class="form-control col-6"  name="storeNum' + i + '"></div>\n          </div>\n        <div class="row margin10">\n          <div class="col-6  input-group">\n            <label for="" class="flex-end input-group-addon col-3">\u5546\u57CE\u540D\u79F0:</label>\n            <input type="text" class="form-control col-6" name="storeName' + i + '"></div>\n          <div class="col-6  input-group">\n            <label for="" class="flex-end input-group-addon col-3">\u5546\u57CE\u5F00\u5173:</label>\n            <select class="form-control col-6" name="selectID' + i + '">\n              <option value="0">\u5F00</option>\n              <option value="1">\u5173</option>\n            </select>\n          </div>\n        </div>\n        <div class="row">\n          <div class="null col-7"></div>\n          <div class="col-4 flexspaceAround marginL_12">\n            <button type="button" class="btn btn-primary">\u786E\u8BA4\u4FEE\u6539</button>\n            <button type="button" class="btn btn-danger" onclick="removeHTML(' + i + ')">\u5220\u9664\u672C\u5206\u9875</button>\n          </div>\n        </div>\n      </div>\n      </div>\n      </div>\n\n      ');
  }
  $('.js-main').html(storeList);
};

//  渲染HTML
storeAddHTML();

var dataAddIn = function dataAddIn() {
  var formData = JSON.parse(sessionStorage.getItem('formData'));
  for (var i = 0; i < stroeData; i++) {
    $('[name=storeID' + i + ']').val(formData['storeID' + i]);
    $('[name=storeNum' + i + ']').val(formData['storeNum' + i]);
    $('[name=storeName' + i + ']').val(formData['storeName' + i]);
    if (formData['selectID' + i] !== undefined) {
      $('[name=selectID' + i + ']').val(formData['selectID' + i]);
    } else {
      $('[name=selectID' + i + ']').val('0');
    }
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

//动态生成 
$(document).delegate("input, textarea, select", "blur", function () {
  dataSave();
});
$(document).delegate("select", "click", function () {
  dataSave();
});

$(".js-addNewStore").on('click', function () {
  stroeData += 1;
  storeList = [];
  storeAddHTML();
  $('.js-main').html(storeList);
  dataAddIn();
});

Array.prototype.remove = function (from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};
var removeHTML = function removeHTML(i) {
  stroeData -= 1;
  storeList.remove(i);
  $('.js-main').html(storeList);
  dataAddIn();
  dataSave();
};

// 重置表格所有数据
$("#formReset").on('click', function () {
  formReset();
  dataSave();
});
var formReset = function formReset() {
  for (var i = 0; i < stroeData; i++) {
    $('[name=storeID' + i + ']').val('');
    $('[name=storeNum' + i + ']').val('');
    $('[name=storeName' + i + ']').val('');
    $('[name=selectID' + i + ']').val("0");
  }
};
