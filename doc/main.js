import Vue from 'vue';
import TyIndex from '../src/index';
import entry from './App';
import VueRouter from 'vue-router';
import Element from 'element-ui';
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import 'element-ui/lib/theme-chalk/index.css';
import routes from './route.config';
import store from './store'
import demoBlock from './components/demo-block.vue';
import MainFooter from './components/footer.vue';
import MainHeader from './components/header.vue';
import SideNav from './components/side-nav';
import FooterNav from './components/footer-nav';
import title from './json/title.json';


Vue.use(TyIndex,{store});
Vue.use(Element);
Vue.use(iView);
Vue.use(VueRouter);
Vue.component('demo-block', demoBlock);
Vue.component('main-footer', MainFooter);
Vue.component('main-header', MainHeader);
Vue.component('side-nav', SideNav);
Vue.component('footer-nav', FooterNav);

const router = new VueRouter({
  mode: 'hash',
  base: __dirname,
  routes
});
router.afterEach(route => {
  for (let val in title) {
    if (new RegExp('^' + val, 'g').test(route.name)) {
      document.title = title[val];
      return;
    }
  }
  document.title = 'tydic-vue-components-base';
});

new Vue({ // eslint-disable-line
  render: h => h(entry),
  router,
  store
}).$mount('#app');
