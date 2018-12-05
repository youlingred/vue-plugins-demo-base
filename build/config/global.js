/**
 *@author       谢辉
 *@date         2018/11/25 16:36
 *@Copyright    天源迪科信息技术股份有限公司
 *@Description
 */
const packageJson=require('../../package.json');
const nameSplit=packageJson.name.split('/');
const name=nameSplit[1]||nameSplit[0];
module.exports={
  name,                             //包名,不包含scope名
  packageName:packageJson.name,     //包名,包含scope名
  appPrefix: 'ty-',
  cssType: 'less'
}
