/* 由'./build/bin/build-comps-index.js' 自动生成*/

import HelloWorld from './components/hello-world/index.js';

const components = [
  HelloWorld,
];

const install = function(Vue, opts = {}) {
  //当有全局组件需要注册到Vue.prototype或者window时,或者需要执行的语句,可以在component.index.tpl添加,例如
  //Vue.prototype.$alert = MessageBox.alert;

  components.map(component => {
    Vue.component(component.name, component);
  });

};

/* html通过script标签引入时自动注册全局vue*/
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
};

export default {
  version: '1.0.3',
  install,
  HelloWorld
};

