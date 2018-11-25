const path = require('path');
const webpack = require('webpack');

module.exports = {
  //入口文件
  entry: path.resolve(__dirname, './index.js'),
  //输出文件
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'index.js',
    library:'VuePluginsDemoBaseHelloWorld',
    libraryTarget: 'umd'
  },
  //模块配置
  module: {
  //规则配置
    rules: [
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ],
      },      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
          }
          // other vue-loader options go here
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  resolve: {
    //创建 import 或 require 的别名，来确保模块引入变得更简单
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    },
    //配置自动解析确定的扩展,能够使用户在引入模块时不带扩展名
    extensions: ['*', '.js', '.vue', '.json']
  },
  //从输出的 bundle 中排除依赖,通常对 library 开发人员来说是最有用的
  externals: {
     vue:{
       root: 'Vue',
       commonjs: 'vue',
       commonjs2: 'vue',
       amd: 'vue'
     }
  },
  performance: {
  //将展示一条警告，通知你这是体积大的资源
    hints: "error"
  },
  //开启source-map
  devtool: '#source-map',
  plugins:[
  //美化source-map
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    })
  ]
};

