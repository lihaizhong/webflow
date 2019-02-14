import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueIcons from './utils/vue-icons'
import './components'

import 'reset-css/less/reset.less'

Vue.use(VueIcons)

Vue.config.ignoreElements = [/^wv-/]
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
