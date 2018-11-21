<template>
  <div id="index">
    <el-carousel :interval="5000" arrow="always">
      <el-carousel-item v-for="item in imgList" :key="item.id">
        <el-row>
          <el-col :span="24"><img ref="imgHeight" :src="item.idView" class="banner_img img-responsive center-block" /></el-col>
        </el-row>
      </el-carousel-item>
    </el-carousel>
    <main>
      <p class="flex-space-between border-bottom"><span>今日推荐</span><span @click="openAll">查看全部 &gt;</span></p>
      <ul class="flex-wrap remUL">
        <template v-for="item in remData">
          <li :key="item.game_id" class="remLi" :data-id="item.game_id" @click="openModal">
            <div class="flex-all-center"><img class="remLi-img" src="../assets/images/icon.png" alt=""></div>
            <div class="flex-column">
              <div class="flex-space-between game-name">
                <div>{{ item.name }}</div>
              </div>
              <el-rate v-model="value5" disabled text-color="#ff9900" score-template="{value}">
              </el-rate>
              <div class="des">1111{{ item.describe }}</div>
            </div>
          </li>
        </template>
      </ul>
      <el-tabs type="border-card" stretch=stretch>
        <el-tab-pane label="开服表">
          <table class="width100 text-center">
            <thead>
              <tr class="border-bottom TBheader">
                <th>开服名称</th>
                <th>开服时间</th>
                <th>礼包</th>
                <th>下载</th>
              </tr>
            </thead>
            <tbody>
              <template v-for="item in gameData">
                <tr :key="item.game_id" class="border-bottom">
                  <td>{{item.name}}</td>
                  <td>{{item.opening_time}}</td>
                  <td @click="openModal" :data-id="item.game_server_id">
                    <svg class="icon">
                      <use xlink:href="#icon-tianmaochaoshixinrenlibao"></use>
                    </svg>
                  </td>
                  <td @click="openModal" :data-id="item.game_server_id">
                    <svg class="icon" aria-hidden="true">
                      <use xlink:href="#icon-xiazai"></use>
                    </svg>
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
        </el-tab-pane>
        <el-tab-pane label="新游榜">
          <template v-for="(item, index) in newgameData">
            <li :key="item.game_id" class="newgameLi flex-space-between">
              <div class="flex-row">
                <div class="flex-all-center">
                  <img class="newgameLi-img" v-if="index === 0" :src="one" alt="">
                  <img class="newgameLi-img" v-if="index === 1" :src="two" alt="">
                  <img class="newgameLi-img" v-if="index === 2" :src="there" alt="">
                  <span class="numberSort" v-if="index >= 3">{{index + 1}}</span>
                  <img class="newgameLi-img" src="../assets/images/icon.png" alt="">
                </div>
                <div class="flex-column font3">
                  <div class="flex-space-between">
                    <div>{{item.name}}</div>
                  </div>
                  <el-rate v-model="value5" disabled text-color="#ff9900" score-template="{value}">
                  </el-rate>
                  <div class="des">1111</div>
                </div>
              </div>
              <div class="flex-all-center">
                <el-button type="success" @click="openModal" :data-id="item.game_id">下载</el-button>
              </div>
            </li>
          </template>
        </el-tab-pane>
      </el-tabs>
    </main>
    <keke-nav></keke-nav>
    <keke-dialog></keke-dialog>
  </div>
</template>
<script>
import ajaxConfig from '@/axios/axiosConfig'
import kekeDialog from './common/keke-dialog.vue'
import kekeNav from './common/keke-nav.vue'
export default {
  name: 'index',
  components: { kekeDialog, kekeNav },
  data() {
    return {
      remData: [],
      gameData: [],
      newgameData: [],
      stretch: true,
      fit: true,
      value5: 5,
      one: require('@/assets/images/one.png'),
      two: require('@/assets/images/two.png'),
      there: require('@/assets/images/three.png'),
      imgList: [
        { id: 0, idView: require('@/assets/images/2.jpg') },
        {
          id: 1,
          name: '详情',
          idView: require('@/assets/images/3.jpg')
        },
        { id: 2, name: '推荐', idView: require('@/assets/images/4.jpg') },
        { id: 3, name: '推荐', idView: require('@/assets/images/elf.jpg') }
      ],

      modalData: {
        openFlag: false
      }
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
      let getKaifu = () => {
        return this.$axios.get('/game-server/index', {
          params: axiosConfig
        })
      }
      let getNewGame = () => {
        return this.$axios.get('/game/new-sort', {
          params: axiosConfig
        })
      }
      this.$axios.all([getRem(), getKaifu(), getNewGame()]).then(
        this.$axios.spread((rem, kaifu, newgame) => {
          this.remData = this._.orderBy(rem.data.data, ['hot'], ['asc'])
          this.gameData = this._.orderBy(kaifu.data.data, ['hot'], ['asc'])
          this.newgameData = this._.orderBy(newgame.data.data, ['hot'], ['asc'])
        })
      )
    },
    openModal(event) {
      let gameID = event.currentTarget.dataset.id
      this.modalData.openFlag = !this.modalData.openFlag
      this.modalData.title = '请选择礼包'
      var gameData = this._.find(this.gameData, { game_server_id: gameID })
      this.modalData.data = gameData
    },
    openAll() {
      this.$router.push({ path: '/game' })
    },
    openDetial(event) {
      //开启大图的每个url
      console.log(event.currentTarget.dataset.id)
    }
  }
}
</script>
<style scoped lang="less">
#index {
  .el-carousel__item {
    img {
      width: 100%;
      height: 300px;
    }
  }

  main {
    margin: 0.1rem;
    border: 1px solid #ccc;
    p {
      padding: 0.1rem;
    }

    .remUL {
      padding: 0.1rem;
      .remLi {
        display: flex;
        flex-direction: row;
        width: 50%;
        padding-bottom: 0.1rem;
        .game-name {
          padding-right: 0.1rem;
        }
        .remLi-img {
          max-width: 1rem;
          max-height: 1rem;
        }
      }
    }

    .TBheader {
      th {
        padding-bottom: 5px;
      }
    }
    .icon {
      width: 0.8rem;
      height: 0.8rem;
      vertical-align: -0.15rem;
      fill: currentColor;
      overflow: hidden;
    }

    .newgameLi {
      padding: 0 0.2rem;
      margin-bottom: 0.1rem;
      .newgameLi-img {
        max-width: 1rem;
        max-height: 1rem;
        padding: 0 0.1rem;
      }
      .numberSort {
        display: flex;
        width: 0.7rem;
        justify-content: center;
        align-items: center;
        color: #ccc;
      }
      .angleImg {
        margin: 0.1rem 0;
        img {
          width: 0.3rem;
          height: 0.3rem;
        }
      }
    }
  }
}
</style>

<style>
.el-tabs--border-card > .el-tabs__content {
  padding: 15px 0 !important;
}
.el-button {
  width: 100%;
  height: 0.8rem;
  padding: 0.1rem 0.2rem;
}
</style>
