import Vue from 'vue'
import ElementUI from 'element-ui'
import App from './App'
import router from './router'
import axios from 'axios'
import "babel-polyfill"
import _ from 'lodash'
import 'reset.css'
import '../static/icon/iconfont.css'
import 'element-ui/lib/theme-chalk/index.css'
import './fitLayout'
Vue.use(ElementUI);


Vue.prototype.$axios = axios
Vue.prototype._ = _


new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
