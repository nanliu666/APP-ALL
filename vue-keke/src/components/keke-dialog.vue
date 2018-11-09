<template>
  <el-dialog :title="modalData.title" :visible.sync="modalData.openFlag" center>
    <div>
    </div>
    <div slot="footer" class="dialog-footer">
      <div v-if="modalData.flag === 'login'" @click='modalData.openFlag = !modalData.openFlag' class="login">去登陆</div>
      <div @click="modalData.openFlag = !modalData.openFlag">关闭</div>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'keke-dialog',
  props: {
    modalData: {
      type: Object
    }
  },
  data() {
    return {}
  }
}
</script>

<style >
.el-dialog {
  margin-top: 3rem !important;
  width: 70% !important;
  border-radius: 0.3rem;
}
.el-dialog__footer {
  padding: 0;
  border-top: 1px solid #ccc;
}
</style>

<style scoped lang="less">
.dialog-footer {
  display: flex;
  div {
    display: flex;
    justify-content: center;
    align-items: center;
    border-right: 1px solid #ccc;
    height: 0.8rem;
    width: 100%;
  }
  div:last-child {
    border: 0;
  }
}
</style>




