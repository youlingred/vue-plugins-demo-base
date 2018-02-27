/* 由'./build/bin/build-comps-index.js' 自动生成*/

{{include}}

const components = [
{{install}},
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
  version: '{{version}}',
  install,
{{list}}
};

