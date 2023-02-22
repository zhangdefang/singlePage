import Vue from 'vue'
import App from './callFunc.vue'
import '@/plugins/element.js'
import '@/plugins/uspui.js'
import '@/plugins/vue-resource.js'
const echarts = require('echarts');

Vue.prototype.$echarts = echarts
Vue.config.productionTip = false
Vue.prototype.$baseUrl = '/apis/'
new Vue({
    render: h => h(App),
}).$mount('#app')
