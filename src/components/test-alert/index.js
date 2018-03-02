import TestAlert from './src/main';

TestAlert.install = function(Vue) {
  Vue.component(TestAlert.name, TestAlert);
};

export default TestAlert;

