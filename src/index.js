/* 由'./build/bin/build-comps-index.js' 自动生成*/

import Button from './components/button/index.js';
import ButtonBlue from './components/button-blue/index.js';
import HelloWorld from './components/hello-world/index.js';
import TreeTable from './components/tree-table/index.js';

const components = [
  Button,
  ButtonBlue,
  HelloWorld,
  TreeTable,
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

export default {
  version: '1.0.0',
  install,
  Button,
  ButtonBlue,
  HelloWorld,
  TreeTable
};

