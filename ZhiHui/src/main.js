import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
Vue.prototype.axios = axios
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
import moment from 'moment'

Vue.use(ElementUI);
Vue.use(ViewUI);
Vue.config.productionTip = false
Vue.prototype.$moment = moment

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')