/**
 * 本地预览
 */
const webpack=require('webpack');
const uppercamelcase = require('uppercamelcase');
const dir=require('../utils/dir');
const merge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.base.config.js');
//Friendly-errors-webpack-plugin可识别某些类型的webpack错误并清理，聚合并优先考虑它们以提供更好的开发者体验。
// http://npm.taobao.org/package/friendly-errors-webpack-plugin
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const libName=require(dir.rootof('package.json')).name;
const LibName = uppercamelcase(libName);

module.exports = merge(webpackBaseConfig, {
  // 入口
  entry: {
    main: './src/index',
  },
  // 输出
  output: {
    path: dir.rootof('dist'),
    publicPath: '',
    library:LibName,
    libraryTarget: "umd",
    filename: `${libName}.js`,
  },
  externals:{
    vue:{
      root: 'Vue',
      commonjs: 'vue',
      commonjs2: 'vue',
      amd: 'vue'
    }
  },
  resolve: {
    alias: {
      vue: 'vue/dist/vue.esm.js'
      // vue: 'vue/dist/vue.runtime.js'
    }
  },
  devtool: '',
  plugins: [
    new FriendlyErrorsPlugin()
  ]
});
