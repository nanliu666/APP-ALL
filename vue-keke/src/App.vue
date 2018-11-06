<template>
    <el-container id="app" class="section-container">
      <el-header height="1.2rem" class="flex-space-between border-bottom">
        <div class="flex-align-items-center">
          <img class="Headimg" src="./assets/images/logo.png" alt="">
        </div>
        <div class="flex-align-items-center">
          <i class="iconfont icon-ren"></i>
        </div>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
      <el-footer height="1.2rem" class="border-top flex-space-between footer">
        <router-link tag="li" class="link" to="/">
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
  name: 'App'
}
</script>

<style  lang="less" scoped>
body,
#app {
  height: 100%;
  .section-container {
    height: 100%;
    header {
      .Headimg {
        max-width: 2rem;
      }
      i {
        font-size: .8rem
      }
    }
    main {
      padding: 0 !important
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
          margin-top: .1rem;
        }
      }
      .router-link-active {
        color: green;
      }
    }
  }
}
</style>
