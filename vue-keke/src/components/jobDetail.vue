<template>
  <div class="job flex-column">
    222
  </div>
</template>
<script>
import ajaxConfig from '@/axios/axiosConfig'
export default {
  name: 'job',
  props: {
    navShow:Boolean,
  },
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
      console.log(index)
    }
  }
}
</script>
<style scoped lang="less">

</style>
