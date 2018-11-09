<template>
  <div class="game">
    <ul class="flex-wrap remUL">
      <template v-for="item in giftsData">
        <li :key="item.game_id" class="remLi flex-space-between" :data-id="item.game_id" @click="openDetail">
          <div class="flex-row">
            <div class="flex-all-center">
              <img class="remLi-img" src="../assets/images/icon.png" alt="">
            </div>
            <div class="flex-column font3">
              <div class="flex-space-between">
                <div>{{item.game_name}}</div>
              </div>
              <el-rate v-model="value5" disabled text-color="#ff9900" score-template="{value}">
              </el-rate>
              <div class="des">1111</div>
            </div>
          </div>
          <div class="flex-all-center">
            <el-button type="success" :data-id="item.game_id">领取礼包</el-button>
          </div>
        </li>
      </template>
    </ul>
  </div>
</template>
<script>
import ajaxConfig from '@/axios/axiosConfig'
import kekeDialog from './keke-dialog.vue'
export default {
  name: 'game',
  props: {
    navShow: Boolean
  },
  components: { kekeDialog },
  data() {
    return {
      giftsData: [],
      counter: this.navShow,
      value5: 5
    }
  },
  created() {
    this.onLoad()
  },
  methods: {
    // 获取数据
    onLoad() {
      let axiosConfig = ajaxConfig
      let getGifts = () => {
        return this.$axios.get('/gift-bag/index', {
          params: axiosConfig
        })
      }
      this.$axios.all([getGifts()]).then(
        this.$axios.spread((gifts, newgame) => {
          this.giftsData = this._.orderBy(gifts.data.data, ['hot'], ['asc'])
        })
      )
    },
    openDetail(event) {
      let id = event.currentTarget.dataset.id
      this.counter = !this.counter
      this.$emit('child', this.counter)
    }
  }
}
</script>
<style scoped lang="less">
.game {
  .remUL {
    margin: 0.2rem;
    border: 1px solid #ccc;
    .remLi {
      width: 100%;
      border-bottom: 1px solid #ccc;
      padding: 0.1rem;
      .remLi-img {
        max-width: 1rem;
        max-height: 1rem;
        margin-right: 0.2rem;
      }
      .newgameLi-img {
        margin-right: 0.2rem;
      }
    }
    &:last-child {
      border-bottom: 0;
    }
  }
}
</style>
