<template>
  <el-container id="app" class="section-container">
    <el-header height="1.2rem" class="flex-space-between border-bottom">
      <router-link tag="li" class="flex-align-items-center" to="/index">
        <img class="Headimg" src="./assets/images/logo.png" alt="">
      </router-link>
      <div class="flex-align-items-center">
        <i class="iconfont icon-ren"></i>
      </div>
    </el-header>
    <el-main>
      <transition :name="fade">
        <keep-alive>
          <router-view :navShow="navShow" @child="listenNavShow"></router-view>
        </keep-alive>
      </transition>
    </el-main>
    <el-footer height="1.2rem" class="border-top flex-space-between footer" v-show="navShow">
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
  </el-container>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      navShow: true,
      fade: ''
    }
  },
  methods: {
    listenNavShow: function(data) {
      this.navShow = data
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
      flex-grow: 1;
      position: relative;
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
    .footer {
      padding: 0 !important;
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
  }
}
</style>
