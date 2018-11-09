<template>
  <div class="about">
    <p class="title">关于我们</p>
    <div class="introduce">
      <p> 广州众玩网络有限公司成立于2015年，作为一家专业的网络游戏自主研发公司，公司核心研发人员均具备大型网络游戏项目开发经验，对网络游戏的设计研发具备深刻的了解与独到的见解。</p>
      <p> 公司下设策划部、研发部、职能部、美术部等部门，在职员工有80多人并在不断壮大队伍，正处于快速发展上升期，欢迎各路人才的加入。</p>
      <p>秉承“一切以用户体验为核心”的经营理念，以打造精品游戏为目标，致力于不断优化用户体验，持续提高自身核心技术研发能力，为用户提供更优质的产品。</p>
      <p>
        公司目前雄踞在广州繁华的天河北商圈，交通快捷便利。如果你是个有梦想并且肯为之奋斗的人，我们不仅能给你提供的是一个工作机会，更能为你提供一个实现梦想的平台！
      </p>
    </div>
    <p class="contact">联系我们</p>
    <div class="introduce">
      <img src="../assets/images/map.png" alt="">
      <p><b>联系地址:</b> 广州市天河区龙怡路117号银汇大厦18楼1805室</p>
      <p><b>简历投递邮箱:</b> hr@gzzhongwan.net</p>
      <p><b>联系电话:</b> 020-37887202 / 18022890303</p>
      <p><b>联系地址:</b></p>
      <p><label for="">地铁:</label>广州地铁3号线华师站E出口</p>
      <p><label for="">公交:</label>师大后门站（B10、B17、B11、813、298、775、41）五山路口站(B10、B11、B17、B14、20、32、78a、130、191）</p>
    </div>
  </div>
</template>
<script>
import ajaxConfig from '@/axios/axiosConfig'
export default {
  name: 'about',
  props: {
    navShow: Boolean
  },
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
    }
  }
}
</script>
<style scoped lang="less">
.about {
  .title,
  .contact {
    background-color: rgb(242, 242, 242);
    font-size: 0.4rem;
    padding: 0.2rem 0 0.2rem 0.4rem;
    border-bottom: 1px solid #ccc;
  }
  .contact {
    border-top: 1px solid #ccc;
  }
  .introduce {
    img {
      width: 100%;
      margin-bottom: .2rem;
    }
    font-size: 0.3rem;
    padding: 0.2rem;
    b {
      font-weight: 900;
    }
  }
}
</style>

