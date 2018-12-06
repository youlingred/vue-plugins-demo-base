import HelloWorldDemo from './src/main';

HelloWorldDemo.install = function(Vue) {
  Vue.component(HelloWorldDemo.name, HelloWorldDemo);
};

export default HelloWorldDemo;

