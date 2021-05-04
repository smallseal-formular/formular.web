import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// View UI
import ViewUI from "view-design";
import 'view-design/dist/styles/iview.css';
// Bootstrap
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
// configGetter: get config file from public/appConfig.json
import { configGetterPromise } from '@/configGetter';

Vue.config.productionTip = false
Vue.use(ViewUI);
Vue.use(BootstrapVue);

// get config then start vue
configGetterPromise.then(
  () => {
    new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app');
  }
);
