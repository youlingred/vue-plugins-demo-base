import TestAlert1 from './src/main';

TestAlert1.install = function(Vue) {
  Vue.component(TestAlert1.name, TestAlert1);
};

export default TestAlert1;

