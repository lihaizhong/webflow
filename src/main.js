import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Bridge from './electron/client/bridge'
import './components'

import 'reset-css/less/reset.less'

Vue.config.ignoreElements = [/^wv-/]
Vue.config.productionTip = false

Vue.use(Bridge)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
