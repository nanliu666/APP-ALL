<template>
  <div id="index">
    <el-carousel :interval="5000" arrow="always">
      <el-carousel-item v-for="item in 4" :key="item">
        <h3>{{ item }}</h3>
      </el-carousel-item>
    </el-carousel>
    <main>
      <p class="flex-space-between border-bottom"><span>今日推荐</span><span>查看全部 &gt;</span></p>
      <ul class="flex-wrap">
        <li class="flexRow flex-align-items-center remLi">
          <img class="remLi-img" src="../assets/images/icon.png" alt="">
          <div class="flex-column width80">
            <div class="flex-space-between">
              <div>王者荣耀</div>
              <img src="../assets/images/free.png" class="freeImg" alt="">
            </div>
            <div class="angleImg">
              <img src="../assets/images/angle.svg" alt="">
            </div>
            <div class="des">1111</div>
          </div>
        </li>
        <li class="flexRow flex-align-items-center remLi">
          <img class="remLi-img" src="../assets/images/icon.png" alt="">
          <div class="flex-column width80">
            <div class="flex-space-between">
              <div>王者荣耀</div>
              <img src="../assets/images/free.png" class="freeImg" alt="">
            </div>
            <div class="angleImg">
              <img src="../assets/images/angle.svg" alt="">
            </div>
            <div class="des">1111</div>
          </div>
        </li>
      </ul>
    </main>
  </div>
</template>
<script>
// import { apiAddress } from '@/axios/api' // 导入我们的api接口
import ajaxConfig from '@/axios/axiosConfig'
export default {
  name: 'index',
  data() {
    return {}
  },
  created() {
    this.onLoad()
  },
  methods: {
    // 获取数据
    onLoad() {
      let axiosConfig = ajaxConfig
      this.$axios({
        methods: 'get',
        url: '/game/new-sort',
        params: axiosConfig
      })
      .then(data => {
          if(data.data && data.data !== '') {
            let data1 = data.data.data
            this._.orderBy(data1, 'hot')
            console.log(data1)
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>
<style scoped lang="less">
#index {
  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
  }
  main {
    margin: 0.1rem;
    border: 1px solid #ccc;
    p {
      padding: 0.1rem;
    }

    ul {
      li {
      }
    }
  }
}
</style>