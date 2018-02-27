const dir=require('../utils/dir');
const chalk=require('chalk');
const Components = require(dir.rootof('build/json/components.json'));
const fs = require('fs');
//渲染json字符模板
const render = require('json-templater/string');
//驼峰命名规范字符串转换
const uppercamelcase = require('uppercamelcase');
//跨平台行末标识符
const endOfLine = require('os').EOL;
//输出路径
const OUTPUT_PATH = dir.rootof('src/index.js');
//import代码块模板
const IMPORT_TEMPLATE = 'import {{name}} from \'./components/{{package}}/index.js\';';
//install代码块模板
const INSTALL_COMPONENT_TEMPLATE = '  {{name}}';
const MAIN_TEMPLATE = fs.readFileSync(dir.rootof('build/tpl/common.index.tpl'),'utf8');

delete Components.font;

const ComponentNames = Object.keys(Components);

const includeComponentTemplate = [];
const installTemplate = [];
const listTemplate = [];

ComponentNames.forEach(name => {
  const componentName = uppercamelcase(name);

  includeComponentTemplate.push(render(IMPORT_TEMPLATE, {
    name: componentName,
    package: name
  }));
  //当有全局组件需要注册到Vue.prototype时可以在这里排除,在common.index.tpl里面添加
  if (['要排除的组件名称'].indexOf(componentName) === -1) {
    installTemplate.push(render(INSTALL_COMPONENT_TEMPLATE, {
      name: componentName,
      component: name
    }));
  }
  listTemplate.push(`  ${componentName}`);
});

const template = render(MAIN_TEMPLATE, {
  include: includeComponentTemplate.join(endOfLine),
  install: installTemplate.join(',' + endOfLine),
  version: process.env.VERSION || require('../../package.json').version,
  list: listTemplate.join(',' + endOfLine)
});

fs.writeFileSync(OUTPUT_PATH, template);
console.log(chalk.bold.green('[组件common index.js] 创建成功:'), OUTPUT_PATH);

