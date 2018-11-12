import Vue from 'vue'
import ElementUI from 'element-ui'
import App from './App'
import router from './router'
import axios from 'axios'
import "babel-polyfill"
import _ from 'lodash'
import 'reset.css'
import '../static/icon/iconfont.css'
import '../static/icon/iconfont.js'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/js/fitLayout'
import Vuex from 'vuex'
import store from '@/vuex/store'
Vue.use(ElementUI)
Vue.use(Vuex)


Vue.prototype.$axios = axios
Vue.prototype._ = _


new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  store,
  template: '<App/>'
})
