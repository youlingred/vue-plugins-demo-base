//FIXME 当components.json意外损坏时,可以用npm run re-coms-json
const fs=require('fs');
const path=require('path');
const fileSave = require('file-save');
const dir=require('../utils/dir')
const comsJsonPath=dir.rootof('build/json/components.json');
const navJsonPath=dir.rootof('build/json/nav.config.json');
const comsDirPath=dir.rootof('src/components/');
const comsFile = {};
//FIXME 读取nav.config.tpl模板文件
const tplNav=fs.readFileSync(path.resolve(__dirname,'../tpl/nav.config.tpl'),'utf8')
//FIXME 读取组件目录,获取文件夹列表
let dirList=fs.readdirSync(comsDirPath);
// console.log(dirList);
//FIXME 解析模板字符串为对象
let navsObj=JSON.parse(tplNav);
//FIXME 遍历目录列表,读取文件,并生成相关json文件
dirList.forEach(file=>{
  // 添加组件名称和路径到components.json
  comsFile[file]=`./components/${file}/index.js`;
  // 检查组件目录内是否存在package.json文件
  if(fs.existsSync(path.join(comsDirPath,file,'package.json'))){
    // 存在的话获取package.json的description属性
    let description=require(path.join(comsDirPath,file,'package.json')).description;
    // 通过正则替换去除所有空格,通过'|'分割字符串,分别作为nav.config里面的groupName和中文名
    let descSplit=description.replace(/\s+/g,'').split('|');
    //组件组名
    let groupName=descSplit[0]?descSplit[0]:'Others';
    //组件中文名
    let comChineseName=descSplit[2]?descSplit[2]:'';
    // console.log(navsObj)
    navsObj[2]['groups'].forEach(group=>{
      if(group.groupName===groupName){
        group.list.push({
          path:`/${file}`,
          title:`${file} ${comChineseName}`
        })
      }
    });
    // console.log(description)
  }
});
//FIXME 生成组件列表文件
fileSave(comsJsonPath)
  .write(JSON.stringify(comsFile, null, '  '), 'utf8')
  .end('\n');
console.log(`生成组件列表文件:${comsJsonPath}`);
//FIXME 生成组件导航文件
fileSave(navJsonPath)
  .write(JSON.stringify(navsObj, null, '  '), 'utf8')
  .end('\n');
console.log(`生成组件导航文件:${navJsonPath}`)
