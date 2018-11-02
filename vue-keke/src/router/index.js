import Vue from 'vue'
import Router from 'vue-router'
import kekeNav from '@/components/keke-nav'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'kekeNav',
      component: kekeNav
    }
  ]
})
