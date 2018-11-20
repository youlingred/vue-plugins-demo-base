/**
 * 生产配置
 */
const webpack=require('webpack');
const fs=require('fs');
const dir=require('../utils/dir');
const HtmlWebpackPlugin = require('html-webpack-plugin');
var slugify = require('transliteration').slugify;
const merge = require('webpack-merge');
let md = require('markdown-it')();
let striptags = require('../utils/strip-tags');
const webpackBaseConfig = require('./webpack.base.config.js');
//Friendly-errors-webpack-plugin可识别某些类型的webpack错误并清理，聚合并优先考虑它们以提供更好的开发者体验。
// http://npm.taobao.org/package/friendly-errors-webpack-plugin
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');

function convert (str) {
  str = str.replace(/(&#x)(\w{4});/gi, function($0) {
    return String.fromCharCode(parseInt(encodeURIComponent($0).replace(/(%26%23x)(\w{4})(%3B)/g, '$2'), 16));
  });
  return str;
}
const wrap = function(render) {
  return function() {
    return render.apply(this, arguments)
      .replace('<code v-pre class="', '<code class="hljs ')
      .replace('<code>', '<code class="hljs">');
  };
};

module.exports = merge(webpackBaseConfig, {
  // 入口
  entry: {
    main: './doc/main',
    vendors: ['vue', 'vue-router']
  },
  // 输出
  output: {
    path: dir.rootof('doc/dist'),
    publicPath: '',
    filename: '[name].js',
    chunkFilename: '[name].chunk.js'
  },
  resolve: {
    alias: {
      vue: 'vue/dist/vue.esm.js'
      // vue: 'vue/dist/vue.runtime.js'
    }
  },
  module:{
    rules:[
      {
        test: /\.md$/,
        loader: 'vue-markdown-loader',
        options:{
          use: [
            [require('markdown-it-anchor'), {
              level: 2,
              slugify: slugify,
              permalink: true,
              permalinkBefore: true
            }],
            [require('markdown-it-container'), 'demo', {
              validate: function(params) {
                return params.trim().match(/^demo\s*(.*)$/);
              },
              render: function(tokens, idx) {
                let m = tokens[idx].info.trim().match(/^demo\s*(.*)$/);
                if (tokens[idx].nesting === 1) {
                  let description = (m && m.length > 1) ? m[1] : '';
                  let content = tokens[idx + 1].content;
                  let code,filename=striptags.fetch(content,'file');
                  if(filename){
                    let filepath=dir.rootof(`src/components/${filename}/src/main.vue`);
                    code = fs.readFileSync(filepath, 'utf8')||'';
                  }
                  let html = convert(striptags.strip(content, ['file','script', 'style'])).replace(/(<[^>]*)=""(?=.*>)/g, '$1');
                  let descriptionHTML = description
                    ? md.render(description)
                    : '';
                  tokens[idx + 1].content=code || '';
                  return `<demo-block class="demo-box">
                    <div class="source" slot="source">${html}</div>
                    ${descriptionHTML}
                    <div class="highlight" slot="highlight">`;
                }
                return '</div></demo-block>\n';
              }
            }],
            [require('markdown-it-container'), 'tip'],
            [require('markdown-it-container'), 'warning'],
          ],
          preprocess: function(MarkdownIt, source) {
            MarkdownIt.renderer.rules.table_open = function() {
              return '<table class="table">';
            };
            MarkdownIt.renderer.rules.fence = wrap(MarkdownIt.renderer.rules.fence);
            return source;
          }
        }
      }
    ]
  },
  plugins: [
    // new webpack.optimize.CommonsChunkPlugin({ name: 'vendors', filename: 'vendor.bundle.js' }),
    new HtmlWebpackPlugin({
      inject: true,
      filename: dir.rootof('doc/dist/index.html'),
      template: dir.rootof('doc/index.html')
    }),
    new FriendlyErrorsPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ]
});
