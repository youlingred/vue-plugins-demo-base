import TestButton from './src/main';

TestButton.install = function(Vue) {
  Vue.component(TestButton.name, TestButton);
};

export default TestButton;

