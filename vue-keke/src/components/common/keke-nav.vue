<template>
  <el-footer height="1.2rem" class="border-top flex-space-between footer" ref="footerLi">
    <router-link tag="li" class="link" to="/index">
      <i class="iconfont icon-fangzi"></i>
      <span>首页</span>
    </router-link>
    <router-link tag="li" class="link" to="/game">
      <i class="iconfont icon-youxi"></i>
      <span>游戏</span>
    </router-link>
    <router-link tag="li" class="link" to="/gifts">
      <i class="iconfont icon-libao"></i>
      <span>礼包</span>
    </router-link>
    <router-link tag="li" class="link" to="/job">
      <i class="iconfont icon-xiaoyuanzhaopin"></i>
      <span>招聘</span>
    </router-link>
    <router-link tag="li" class="link" to="/about">
      <i class="iconfont icon-guanyu"></i>
      <span>关于</span>
    </router-link>
  </el-footer>
</template>

<script>
export default {
  name: 'keke-nav'
}
</script>

<style lang='less'>
.footer {
  padding: 0 !important;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #ffffff;
  height: 1rem;
  .link {
    text-decoration: none;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 20%;
    flex-direction: column;
    span {
      margin-top: 0.1rem;
    }
  }
  .router-link-exact-active {
    color: green;
  }
}
</style>
