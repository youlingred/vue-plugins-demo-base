/* 由'./build/bin/build-comps-index.js' 自动生成*/

import Test11 from './components/test11/index.js';
import Test12 from './components/test12/index.js';
import Test13 from './components/test13/index.js';
import Test14 from './components/test14/index.js';
import Ttt from './components/ttt/index.js';

const components = [
  Test11,
  Test12,
  Test13,
  Test14,
  Ttt,
];

const install = function(Vue, opts = {}) {

  components.map(component => {
    Vue.component(component.name, component);
  });
  //当有全局组件需要注册到Vue.prototype时可以在这里添加
  //Vue.prototype.$alert = MessageBox.alert;
};

/* html通过script标签引入时自动注册全局vue*/
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
};

module.exports = {
  version: '1.0.0',
  install,
  Test11,
  Test12,
  Test13,
  Test14,
  Ttt
};

module.exports.default = module.exports;
