import Vue from 'vue'
import { BootstrapVue , IconsPlugin } from 'bootstrap-vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueSocketIO from 'vue-socket.io'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

Vue.use(new VueSocketIO({
  debug: false,
  connection: 'https://volonterskiapp.herokuapp.com',
  vuex: {
    store,
    actionPrefix: 'socket_',

  }

}));


new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
