import Vue from 'vue'
import Router from 'vue-router'
import components from "./compoents"

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
      path: '/index',
      meta: {
        index: 0
      },
      name: 'index',
      component: components.index
    },
    {
      path: '/game',
      meta: {
        index: 1
      },
      name: 'game',
      component: components.game,
      children: [{
        path: 'detail/:id',
        name: 'detail',
        component: components.detail,
      }]
    },
    {
      path: '/gifts',
      meta: {
        index: 2
      },
      name: 'gifts',
      component: components.gifts
    }, {
      path: '/job',
      meta: {
        index: 3
      },
      name: 'job',
      component: components.job,
    },
    {
      path: '/jobDetail',
      meta: {
        index: 3
      },
      name: 'jobDetail',
      component: components.jobDetail
    }, {
      path: '/jobTable',
      meta: {
        index: 3
      },
      name: 'jobTable',
      component: components.jobTable
    }, {
      path: '/about',
      meta: {
        index: 4
      },
      name: 'about',
      component: components.about
    }, {
      path: '/center',
      meta: {
        index: 5
      },
      name: 'center',
      component: components.center
    },
    {
      path: "*",
      redirect: "/index"
    }
  ]
})
