/**
 *@author       谢辉
 *@date         2018/11/23 10:17
 *@Copyright    天源迪科信息技术股份有限公司
 *@Description
 */
const files = require.context('.', false, /\.js$/);
const modules = {};

files.keys().forEach(key => {
  if (key === './index.js') return;
  modules[key.replace(/(\.\/|\.js)/g, '')] = files(key).default;
});

export default modules
