<template>
  <div class="index bgc ">
    <header>
      <img src="../assets/images/1.jpg" alt="">
      <div class="flex-align-items-center">
        <i class="iconfont icon-ren "></i>
      </div>
    </header>

    <ul class="nav bgc">
      <li>首页</li>
      <li>游戏</li>
      <li>礼包</li>
      <li>招聘</li>
      <li>关于</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'kekeNav'
}
</script>

<style lang="less" scoped>
.index {
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.2rem;
    border: 1px solid #ccc;

    img {
      max-width: 1rem;
      max-height: 1rem;
    }
  }

  ul {
    display: flex;
    justify-content: space-between;

    li {
      list-style-type: none;
    }
  }
}
</style>


