'use strict';
/**创建组件,并生成组件相关文件**/
console.log('');
process.on('exit', () => {
  console.log('');
});
if(!process.execArgv.indexOf('-nodev'))
if (!process.argv[2]) {
  console.error('[组件名]第一个参数必填 ');
  process.exit(1);
}
if (!process.argv[3]) {
  console.error('[组件中文名]第二个参数必填');
  process.exit(1);
}
if (!process.argv[4]) {
  console.error('[组件分组名]第三个参数必填');
  process.exit(1);
}
// if (!process.argv[5]) {
//   console.error('[作者名]第四个参数必填');
//   process.exit(1);
// }
const fs=require('fs');
const chalk=require('chalk');
const path = require('path');
const dir=require('../utils/dir');
const packageJson=require(dir.rootof('package.json'))
const fileSave = require('file-save');
const render = require('json-templater/string');
const uppercamelcase = require('uppercamelcase');
//FIXME 定义名称常量
const folderName=`${process.argv[2]}`;
const componentshortname = folderName;
const ComponentShortName = uppercamelcase(componentshortname);
const libName=`${packageJson.name}-${componentshortname}`;
const LibName = uppercamelcase(libName);
const componentname = `${globalConfig.appPrefix}${componentshortname}`;
const ComponentName = uppercamelcase(componentname);
const chineseName = process.argv[3];
// const groupName=process.argv[4]
const author = process.argv[4];
const PackagePath = path.resolve(__dirname, '../../src/components', componentname);

//FIXME 检查文件是否存在
if(fs.existsSync(dir.rootof('src/components/'+componentname))){
  console.log(dir.rootof('src/components/'+componentname))
  console.error(chalk.red(`warning:组件${componentname}已经存在`));
  process.exit(1);
}
//FIXME 定义模板文件常量
const tplIndex=fs.readFileSync(path.resolve(__dirname,'../tpl/component.index.tpl'),'utf8');
const tplConfig=fs.readFileSync(path.resolve(__dirname,'../tpl/component.config.tpl'),'utf8');
const tplPackage=fs.readFileSync(path.resolve(__dirname,'../tpl/component.package.tpl'),'utf8')
const tplMain=fs.readFileSync(path.resolve(__dirname,'../tpl/component.main.tpl'),'utf8')
const Files=[
  {
    filename:'package.json',
    content:render(tplPackage,{
      libName:libName,
      keywords:libName,
      ComponentShortName:ComponentShortName,
      chineseName:chineseName,
      // groupName:groupName,
      author:author
    })
  },
  {
    filename:'index.js',
    content:render(tplIndex,{
      ComponentShortName:ComponentShortName
    })
  },
  {
    filename:'config.js',
    content:render(tplConfig,{
      LibName:LibName
    })
  },
  {
    filename:'src/main.vue',
    content:render(tplMain,{
      ComponentName:ComponentName,
      componentname:componentname
    })
  }
];
//FIXME 生成文件
Files.forEach(file => {
  const filePath=path.join(PackagePath, file.filename)
  fileSave(filePath)
    .write(file.content, 'utf8')
    .end('\n');
  console.log(chalk.green(`创建文件:${filePath}`));
});
console.log(chalk.green('success:组件'+chalk.red(componentname)+'创建完成'));



