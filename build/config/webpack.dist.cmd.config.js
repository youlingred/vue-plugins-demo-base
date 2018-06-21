/**
 * 本地预览
 */
const webpack=require('webpack');
const dir=require('../utils/dir');
const merge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.base.config.js');
//Friendly-errors-webpack-plugin可识别某些类型的webpack错误并清理，聚合并优先考虑它们以提供更好的开发者体验。
// http://npm.taobao.org/package/friendly-errors-webpack-plugin
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');

module.exports = merge(webpackBaseConfig, {
  // 入口
  entry: {
    main: './src/index',
    // vendors: ['vue', 'vue-router']
  },
  // 输出
  output: {
    path: dir.rootof('dist'),
    publicPath: '',
    library:'TyVuecoms',
    libraryTarget: "commonjs2",
    filename: 'index.js',
    // chunkFilename: '[name].chunk.js'
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
    // new webpack.optimize.CommonsChunkPlugin({ name: 'vendors', filename: 'vendor.bundle.js' }),
    new FriendlyErrorsPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    })
  ]
});
