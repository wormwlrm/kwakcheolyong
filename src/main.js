import Vue from 'vue';
import ElementUI from 'element-ui';
import locale from 'element-ui/lib/locale/lang/ko';
import Ads from 'vue-google-adsense';
import 'element-ui/lib/theme-chalk/index.css';
// eslint-disable-next-line
import 'element-theme-dark';

import App from './App.vue';

Vue.use(require('vue-script2'));

Vue.use(Ads.Adsense);

Vue.use(ElementUI, {
  locale,
});

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');
