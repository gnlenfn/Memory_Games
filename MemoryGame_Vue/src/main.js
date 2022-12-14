import Vue from 'vue'
import App from './App.vue'
// import router from './router'
import store from './store'
import "./assets/styles/main.css"
Vue.config.productionTip = false

require("@/assets/styles/main.css")

Vue.prototype.TRANSITION_FLIP = 300;
Vue.prototype.AWAIT_WRONG = 750;

new Vue({
  // router,
  store,
  render: h => h(App)
}).$mount('#app')
