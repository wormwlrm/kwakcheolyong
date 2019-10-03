import Vue from 'vue';
import ElementUI from 'element-ui';
import '@/style/element-ui.scss';
import 'element-theme-dark';
import locale from 'element-ui/lib/locale/lang/ko';
import App from './App.vue';

Vue.use(ElementUI, {
  locale,
});

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app');
