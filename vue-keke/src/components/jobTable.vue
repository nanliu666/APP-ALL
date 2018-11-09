<template>
  <div class="job flex-column">
    <p>{{title}}</p>
  </div>
</template>
<script>
import ajaxConfig from '@/axios/axiosConfig'
export default {
  name: 'job',
  props: {
    navShow: Boolean
  },
  data() {
    return {
      remData: [],
      title: ''
    }
  },
  created() {
    this.onLoad()
  },
  mounted() {
    this.onLoad()

  },
  methods: {
    // 获取数据
    onLoad() {
      let axiosConfig = ajaxConfig
      console.log(this.$route.params.id)
      if (this.$route.params.id === 'sz') {
        this.title = '社会招聘'
      } else {
        this.title = '校园招聘'
      }
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
    }
  }
}
</script>
<style scoped lang="less">
.job {
  padding: 0.3rem;
  img {
    width: 100%;
    margin-bottom: 0.2rem;
  }
}
</style>
