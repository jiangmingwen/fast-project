import Vue from 'vue'
import antd from 'ant-design-vue'
import '@/assets/styles/theme.less'

import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

Vue.use(antd);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')