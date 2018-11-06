import Vue from 'vue'
import Router from 'vue-router'
import components from "./compoents"

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
      path: '/',
      name: 'index',
      component: components.index
    },
    {
      path: '/game',
      name: 'game',
      component: components.game
    }
  ]
})
