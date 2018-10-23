let[ stroeData, storeList]= [1, []] //stroeData列表个数， 添加的HTML数组

/**
 *操作HTML，加入
 *
 */
const storeAddHTML = function () {
  for (let i = 0; i < stroeData; i++) {
    storeList.push(
      `
      <div class="shopLi${i}">
        <div class="stroeList borderTop marginTop10 ">
        <div class="row margin10">
          <div class="col-6  input-group">
            <label for="" class="flex-end input-group-addon col-3">商品编号:</label>
            <input type="text" class="form-control col-6" name="storeID${i}">
          </div>
          <div class="col-6  input-group">
            <label for="" class="flex-end input-group-addon col-3">商品排序序号:</label>
            <input type="text" class="form-control col-6" name="storeNum${i}"></div>
        </div>
        <div class="row margin10">
          <div class="col-6  input-group">
            <label for="" class="flex-end input-group-addon col-3">商品名称:</label>
            <input type="text" class="form-control col-6" name="storeName${i}"></div>
          <div class="col-6  input-group"><label for="" class="flex-end input-group-addon col-3">单词兑换数量:</label>
          <input type="text" name="storeChangeNumber${i}" class="form-control col-6"></div>
        </div>
        <div class="row margin10">
          <div class="col-6  input-group">
            <label for="" class="flex-end input-group-addon col-3">商品库存:</label>
            <input type="text" class="form-control col-6" name="storeLeftNumber${i}"></div>
          <div class="col-6  input-group"><label for="" class="flex-end input-group-addon col-3">每天兑换数量:</label>
          <input type="text" class="form-control col-6" name="storeDayNumber${i}"></div>
        </div>
        <div class="row margin10">
          <div class="col-6  input-group">
            <label for="" class="flex-end input-group-addon col-3">商品图标:</label>
            <input type="text" class="form-control col-6"  name="storeIcon${i}">
          </div>
          <div class="col-6  input-group">
            <label for="" class="flex-end input-group-addon col-3">商品类型: </label>
            <input type="text" class="form-control col-6" name="storeType${i}">
          </div>
        </div>
        <div class="row margin10">
          <div class="col-6  input-group">
            <label for="" class="flex-end input-group-addon col-3">兑换货币:</label>
            <input type="text" class="form-control col-6"  name="storeCurrency${i}"></div>
          <div class="col-6  input-group">
            <label for="" class="flex-end input-group-addon col-3">兑换货币数量:</label>
            <input type="text" class="form-control col-6"  name="storeCurrencyNum${i}"></div>
        </div>
        <div class="row margin20">
          <div class="col-12  input-group padding60">
            <label for="" class="input-group-addon flexHcenter">商品描述:</label>
            <textarea class="form-control margin18" rows="3"  name="storeDes${i}"></textarea>
          </div>
        </div>
        <div class="row marginBootom20">
          <div class="col-4 offset-md-6 flexspaceAround">
            <button type="button" class="btn btn-info button-width">保存本商品</button>
            <button type="button" class="btn btn-danger button-width" onclick="removeHTML(${i})">删除新商品</button>
          </div>
        </div>
      </div>
    </div>
      `
    )
  }
$('.js-main').html(storeList)
}
storeAddHTML()

/**
 *保存的数据加入新生的HTML
 *
 */
const dataAddIn = function () {
  const formData = JSON.parse(sessionStorage.getItem('formData'))
  for (let i = 0; i < stroeData; i++) {
    $(`[name=storeChangeNumber${i}]`).val(formData[`storeChangeNumber${i}`])
    $(`[name=storeID${i}]`).val(formData[`storeID${i}`])
    $(`[name=storeNum${i}]`).val(formData[`storeNum${i}`])
    $(`[name=storeType${i}]`).val(formData[`storeType${i}`])
    $(`[name=storeName${i}]`).val(formData[`storeName${i}`])
    $(`[name=storeLeftNumber${i}]`).val(formData[`storeLeftNumber${i}`])
    $(`[name=storeDayNumber${i}]`).val(formData[`storeDayNumber${i}`])
    $(`[name=storeIcon${i}]`).val(formData[`storeIcon${i}`])
    $(`[name=storeCurrency${i}]`).val(formData[`storeCurrency${i}`])
    $(`[name=storeCurrencyNum${i}]`).val(formData[`storeCurrencyNum${i}`])
    $(`[name=storeDes${i}]`).val(formData[`storeDes${i}`])
  }
}

/**
 *form输入的数据通过回话存储保存
 *
 */
const dataSave = function () {
  var formD = {};
  var t = $(`form`).serializeArray();
  $.each(t, function () {
    formD[this.name] = this.value;
  });
  sessionStorage.setItem(`formData`, JSON.stringify(formD))
}

//添加新商品
$(".js-addNewStore").on('click', function () {
  storeList = []
  stroeData += 1
  storeAddHTML()
  $('.js-main').html(storeList)
  dataAddIn()
})

/**
 *数组指定移除i位元素
 *
 * @param {*} from 从第几位开始
 * @param {*} to 到第几位结束
 * @returns 返回移除后的数组
 */
Array.prototype.remove = function (from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};

/**
 *
 *
 * @param {*} 移除第i位HTML数组
 */
const removeHTML = function (i) {
  stroeData -= 1
  storeList.remove(i)
  $('.js-main').html(storeList)
  dataAddIn()
  dataSave()
}

//动态生成 事件失焦失败解决
$(document).delegate("input, textarea", "blur", function () {
  dataSave()
}) 

// 重置表格所有数据
$("#formReset").on('click', function () {
  formReset()
  dataSave()
}, )
/**
 *重置表单
 *
 */
const formReset = function () {
  for (let i = 0; i < stroeData; i++) {
    $(`[name=storeChangeNumber${i}]`).val('')
    $(`[name=storeID${i}]`).val('')
    $(`[name=storeNum${i}]`).val('')
    $(`[name=storeType${i}]`).val('')
    $(`[name=storeName${i}]`).val('')
    $(`[name=storeLeftNumber${i}]`).val('')
    $(`[name=storeDayNumber${i}]`).val('')
    $(`[name=storeIcon${i}]`).val('')
    $(`[name=storeCurrency${i}]`).val('')
    $(`[name=storeCurrencyNum${i}]`).val('')
    $(`[name=storeDes${i}]`).val('')
  }
}
