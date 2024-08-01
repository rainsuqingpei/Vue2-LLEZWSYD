import Vue from 'vue'
import App from './tlHomes.vue'
import 'babel-polyfill'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)
// 自定义工具类
import utils from '@/util/utils'
Vue.prototype.utils = utils

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')