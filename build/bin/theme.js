'use strict';
const css_type='scss'
const chalk = require('chalk')
/**生成组件css文件**/
console.log('');
process.on('exit', () => {
  console.log('');
});
if (!process.argv[2]) {
  console.error('[主题名]必填 ');
  process.exit(1);
}
//新生成主题名称
const themeName = process.argv[2];
const fs = require('fs');
const fileSave = require('file-save');
const render = require('json-templater/string');
const dir = require('../utils/dir').rootof;
//组件文件夹路径
const comsPath = dir('src/components');
//主题生成路径
const themePath = dir(`themes`);
const tplGulp = fs.readFileSync(dir('build/tpl/theme.gulp.tpl'), 'utf8');
const tplPackage = fs.readFileSync(dir('build/tpl/theme.package.tpl'), 'utf8');
//import代码块模板
const IMPORT_TEMPLATE = `@import './{{name}}.${css_type}';`;
const importCss = [];
const indexPath = dir(`themes/${themeName}/src/index.${css_type}`);
//跨平台行末标识符
const endOfLine = require('os').EOL;

// //检查主题是否已经存在
// let themeDir = fs.readdirSync(themePath);
// themeDir.forEach(file => {
//   if (file === themeName) {
//     console.log(chalk.bold.red(`主题${themeName}已经存在`));
//     process.exit(1)
//   }
// });

//生成package.json
let packagePath = dir(`${themePath}/${themeName}/package.json`);
if (!fs.existsSync(packagePath)) {
  fileSave(packagePath)
    .write(render(tplPackage, {themeName: themeName}), 'utf8')
    .end('\n');
  ;
}
;
//生成gulp文件
let gulpPath = dir(`${themePath}/${themeName}/gulpfile.js`);
if (!fs.existsSync(gulpPath)) {
  fileSave(gulpPath)
    .write(render(tplGulp), 'utf8')
    .end('\n');
  ;
}
;
//根据组件生成主题文件
let comsDir = fs.readdirSync(comsPath);
comsDir.forEach(file => {
  let filePath = dir(`${themePath}/${themeName}/src/${file}.${css_type}`);
  if (!fs.existsSync(filePath)) {
    fileSave(filePath);
  }
  importCss.push(render(IMPORT_TEMPLATE, {name: file}));
});
//生成index.scss
fileSave(indexPath)
  .write(importCss.join(endOfLine),'utf8')
  .end('\n');
//生成fonts文件夹
let fontsPath = dir(`${themePath}/${themeName}/src/fonts`);
if (!fs.existsSync(fontsPath)) {
  fs.mkdirSync(fontsPath);
}
;
