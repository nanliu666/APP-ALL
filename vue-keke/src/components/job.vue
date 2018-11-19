<template>
  <div class="job">
    <div class="flex-column jobImg">
      <router-link :to="{name:'jobTable', params: {id: 'sz'}}"><img src="../assets/images/sz.jpg" @click="openDetail" alt=""></router-link>
      <router-link :to="{name:'jobTable', params: {id: 'xz'}}"><img src="../assets/images/xz.jpg" @click="openDetail" alt=""></router-link>
    </div>
    <router-view></router-view>
    <keke-nav></keke-nav>
  </div>
</template>
<script>
import ajaxConfig from '@/axios/axiosConfig'    
import kekeNav from './common/keke-nav.vue'

export default {
  name: 'job',
  components: {  kekeNav },
  data() {
    return {
      remData: [],
    }
  },
  created() {
    this.onLoad()
  },
  methods: {
    // 获取数据
    onLoad() {
      let axiosConfig = ajaxConfig
      console.log(this.navshow)
      let getRem = () => {
        return this.$axios.get('/game/recommend', {
          params: axiosConfig
        })
      }
      let getNewGame = () => {
        return this.$axios.get('/game/new-sort', {
          params: axiosConfig
        })
      }
      this.$axios.all([getRem(), getNewGame()]).then(
        this.$axios.spread((rem, newgame) => {
          this.remData = this._.orderBy(rem.data.data, ['hot'], ['asc'])
          this.newgameData = this._.orderBy(newgame.data.data, ['hot'], ['asc'])
        })
      )
    },
    openDetail(event) {
      const index = event.currentTarget.dataset.index
    }
  }
}
</script>
<style scoped lang="less">
.job {
  padding: 0.3rem;
  .jobImg {
    img {
      width: 100%;
      margin-bottom: 0.2rem;
    }
  }
}
</style>
