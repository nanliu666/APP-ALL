let [stroeData, storeList] = [1, []]

const storeAddHTML = function () {
  for (let i = 0; i < stroeData; i++) {
    storeList.push(
      `
      <div class="shopLi${i}">
      <div class=" stroeList borderTop marginTop10 ">
        <div class="row margin10">
          <div class="col-6  input-group">
            <label for="" class="flex-end input-group-addon col-3">商品编号:</label>
            <input type="text" class="form-control col-6"  name="storeID${i}">
            </div>
            <div class="col-6  input-group">
            <label for="" class="flex-end input-group-addon col-3">商城排序序号:</label>
            <input type="text" class="form-control col-6"  name="storeNum${i}"></div>
          </div>
        <div class="row margin10">
          <div class="col-6  input-group">
            <label for="" class="flex-end input-group-addon col-3">商城名称:</label>
            <input type="text" class="form-control col-6" name="storeName${i}"></div>
          <div class="col-6  input-group">
            <label for="" class="flex-end input-group-addon col-3">商城开关:</label>
            <select class="form-control col-6" name="selectID${i}">
              <option value="0">开</option>
              <option value="1">关</option>
            </select>
          </div>
        </div>
        <div class="row">
          <div class="null col-7"></div>
          <div class="col-4 flexspaceAround marginL_12">
            <button type="button" class="btn btn-primary">确认修改</button>
            <button type="button" class="btn btn-danger" onclick="removeHTML(${i})">删除本分页</button>
          </div>
        </div>
      </div>
      </div>
      </div>

      `
    )
  }
  $('.js-main').html(storeList)
}

//  渲染HTML
storeAddHTML()

const dataAddIn = function () {
  let formData = JSON.parse(sessionStorage.getItem('formData'))
  for (let i = 0; i < stroeData; i++) {
    $(`[name=storeID${i}]`).val(formData[`storeID${i}`])
    $(`[name=storeNum${i}]`).val(formData[`storeNum${i}`])
    $(`[name=storeName${i}]`).val(formData[`storeName${i}`])
    if(formData[`selectID${i}`] !== undefined) {
      $(`[name=selectID${i}]`).val(formData[`selectID${i}`])
    } else {
      $(`[name=selectID${i}]`).val('0')
    }
  }
}


const dataSave = function () {
  var formD = {};
  var t = $(`form`).serializeArray()
  $.each(t, function () {
    formD[this.name] = this.value
  });
  sessionStorage.setItem(`formData`, JSON.stringify(formD))
}


//动态生成 
$(document).delegate("input, textarea, select", "blur", function () {
  dataSave()
})
$(document).delegate("select", "click", function () {
  dataSave()
})

$(".js-addNewStore").on('click', function () {
  stroeData += 1
  storeList = []
  storeAddHTML()
  $('.js-main').html(storeList)
  dataAddIn()
})




Array.prototype.remove = function (from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};
const removeHTML = function (i) {
  stroeData -= 1
  storeList.remove(i)
  $('.js-main').html(storeList)
  dataAddIn()
  dataSave()
}

// 重置表格所有数据
$("#formReset").on('click', function () {
  formReset()
  dataSave()
}, )
const formReset = function () {
  for (let i = 0; i < stroeData; i++) {
    $(`[name=storeID${i}]`).val('')
    $(`[name=storeNum${i}]`).val('')
    $(`[name=storeName${i}]`).val('')
    $(`[name=selectID${i}]`).val("0")
  }
}