<template>
  <div class="game">
    <el-tabs type="border-card" stretch=stretch>
      <el-tab-pane label="推荐">
        <ul class="pubilcBox flex-wrap">
          <li><img src="../assets/images/icon.png" alt=""></li>
          <li><img src="../assets/images/icon.png" alt=""></li>
          <li><img src="../assets/images/icon.png" alt=""></li>
          <li><img src="../assets/images/icon.png" alt=""></li>
        </ul>
        <ul class="flex-wrap remUL">
          <template v-for="item in remData">
            <li :key="item.game_id" class="remLi flex-space-between" :data-id="item.game_id" @click="openDetail">
              <div class="flex-row">
                <div class="flex-all-center">
                  <img class="remLi-img" src="../assets/images/icon.png" alt="">
                </div>
                <div class="flex-column font3">
                  <div class="flex-space-between">
                    <div>{{item.name}}</div>
                  </div>
                  <div class="angleImg">
                    <img src="../assets/images/angle.svg" alt="">
                    <img src="../assets/images/angle.svg" alt="">
                    <img src="../assets/images/angle.svg" alt="">
                    <img src="../assets/images/angle.svg" alt="">
                    <img src="../assets/images/angle.svg" alt="">
                  </div>
                  <div class="des">1111</div>
                </div>
              </div>
              <div class="flex-all-center">
                <el-button type="success" :data-id="item.game_id">下载</el-button>
              </div>
            </li>
          </template>
        </ul>
      </el-tab-pane>
      <el-tab-pane label="排行">
        <ul class="flex-wrap remUL">
          <template v-for="item in newgameData">
            <li :key="item.game_id" class="remLi flex-space-between" @click="openDetail" :data-id="item.game_id">
              <div class="flex-row">
                <div class="flex-all-center">
                  <img class="newgameLi-img" src="../assets/images/one.png" alt="">
                  <img class="remLi-img" src="../assets/images/icon.png" alt="">
                </div>
                <div class="flex-column font3">
                  <div class="flex-space-between">
                    <div>{{item.name}}</div>
                  </div>
                  <div class="angleImg">
                    <img src="../assets/images/angle.svg" alt="">
                    <img src="../assets/images/angle.svg" alt="">
                    <img src="../assets/images/angle.svg" alt="">
                    <img src="../assets/images/angle.svg" alt="">
                    <img src="../assets/images/angle.svg" alt="">
                  </div>
                  <div class="des">1111</div>
                </div>
              </div>
              <div class="flex-all-center">
                <el-button type="success" :data-id="item.game_id">下载</el-button>
              </div>
            </li>
          </template>
        </ul>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import ajaxConfig from '@/axios/axiosConfig'
import kekeDialog from './common/keke-dialog.vue'
export default {
  name: 'game',

  components: { kekeDialog },
  data() {
    return {
      remData: [],
      newgameData: [],
      counter: this.navShow
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
      let id = event.currentTarget.dataset.id
    }
  }
}
</script>
<style scoped lang="less">
.game {
  padding: 0.2rem;
  .pubilcBox {
    li {
      width: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        max-width: 3rem;
        max-height: 3rem;
        padding: 0.1rem;
      }
    }
  }

  .remUL {
    margin: 0.3rem;
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
        margin-right: .2rem;
      }
    }
    &:last-child {
      border-bottom: 0;
    }
  }
}
</style>

<style>
.el-tabs--border-card > .el-tabs__content {
  padding: 15px 0 !important;
}
</style>