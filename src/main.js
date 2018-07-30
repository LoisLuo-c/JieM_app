// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import $ from 'jquery'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'

import VueVideoPlayer from 'vue-video-player'
import 'video.js/dist/video-js.css'
import 'vue-video-player/src/custom-theme.css'


import './assets/font/iconfont.css'
import './assets/reset.css'
import 'mint-ui/lib/style.css'
import './assets/my_mint.css'

Vue.use(VueAxios, axios)
// Vue.use(VideoPlayer)
Vue.use(VueVideoPlayer, /* {
  options: global default options,
  events: global videojs events
} */)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
