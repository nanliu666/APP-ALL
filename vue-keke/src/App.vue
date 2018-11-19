<template>
  <el-container id="app" class="section-container">
    <el-header height="1.2rem" class="flex-space-between border-bottom">
      <router-link tag="li" class="flex-align-items-center" to="/index">
        <img class="Headimg" src="./assets/images/logo.png" alt="">
      </router-link>
      <router-link tag="li" class="flex-align-items-center" to="/center">
        <i class="iconfont icon-ren"></i>
      </router-link>
    </el-header>
    <el-main>
      <transition name="router-fade">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </transition>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      fade: ''
    }
  },
  watch: {
    $route(to, from) {
      const toDepth = to.meta.index
      const fromDepth = from.meta.index
      this.fade = toDepth > fromDepth ? 'slide-left' : 'slide-right'
    }
  }
}
</script>

<style  lang="less" scoped>
body,
#app {
  height: 100%;
  .section-container {
    display: flex;
    flex-direction: column;
    height: 100%;
    header {
      .Headimg {
        max-width: 2rem;
      }
      i {
        font-size: 0.8rem;
      }
    }
    main {
      padding: 0 !important;
      margin-bottom: 1.2rem;
      .router-fade-enter-active,
      .router-fade-leave-active {
        transition: opacity 0.3s;
      }
      .router-fade-enter,
      .router-fade-leave-active {
        opacity: 0;
      }

      //路由左滑右划动画
      .slide-right-enter-active,
      .slide-right-leave-active,
      .slide-left-enter-active,
      .slide-left-leave-active {
        will-change: transform;
        transition: all 500ms;
        position: absolute;
      }
      .slide-right-enter {
        opacity: 0;
        transform: translate3d(-100%, 0, 0);
      }
      .slide-right-leave-active {
        opacity: 0;
        transform: translate3d(100%, 0, 0);
      }
      .slide-left-enter {
        opacity: 0;
        transform: translate3d(100%, 0, 0);
      }
      .slide-left-leave-active {
        opacity: 0;
        transform: translate3d(-100%, 0, 0);
      }
    }
  }
}
</style>

<style>
.el-rate__icon {
  margin-right: 2px;
}
</style>

