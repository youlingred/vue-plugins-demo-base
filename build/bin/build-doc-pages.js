'use strict';

const fs = require('fs');
const chalk=require('chalk')
const dir = require('../utils/dir')
const langConfig = require(dir.rootof('doc/json/page.json'));
  Object.keys(langConfig).forEach(page => {
    let templatePath = dir.rootof(`doc/pages/template/${ page }.tpl`);
    let outputPath = dir.rootof(`doc/pages/${ page }.vue`);
    let content = fs.readFileSync(templatePath, 'utf8');
    let pairs = langConfig[page];

    Object.keys(pairs).forEach(key => {
      content = content.replace(new RegExp(`<%=\\s*${ key }\\s*>`, 'g'), pairs[key]);
    });

    fs.writeFileSync(outputPath, content);
    console.log(chalk.green("生成页面:")+outputPath);
  });
console.log(chalk.green("生成板页面完成"))
