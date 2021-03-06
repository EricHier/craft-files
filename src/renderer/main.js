import Vue from 'vue'
import "./assets/css/tailwind.css"
import App from './App'
import router from './router'
import store from './store'
import { ipcRenderer } from "electron";

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')