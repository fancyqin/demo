const path = require('path')
const webpack = require('webpack')
​
// 先定义一些路径
// 配置文件夹路径
const CONFIG_PATH = path.resolve(__dirname)
// 源码文件夹路径
const APP_PATH = path.resolve(CONFIG_PATH, '../src')
// 应用入口文件
const APP_FILE = path.resolve(APP_PATH, 'index.js')
// 打包目录文件夹路径
const BUILD_PATH = path.resolve(ROOT_PATH, '../dist')
​
module.exports = {
  // 入口
  entry: APP_FILE,
  // 输出
  output: {
    // 告诉Webpack结果存储在哪里
    path: BUILD_PATH,
    // 打包后的文件名
    filename: 'luanda.js',
    //模板、样式、脚本、图片等资源对应的server上的路径
    publicPath: "/dist/",
  },
  rules: [
    {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: "babel-loader"
    },
    {
      test: /\.css$/,
      use: [
        'style-loader',
        'css-loader',
        {
          loader: 'postcss-loader',
          options: {
            plugins: (loader) => [
              require('autoprefixer')()
            ]
          }
        }
      ]
    },
    {
      test: /\.scss$/,
      use: [
        'style-loader',
        'css-loader',
        {
          loader: 'postcss-loader',
          options: {
            plugins: (loader) => [
              require('autoprefixer')()
            ]
          }
        },
        'sass-loader'
      ]
    },
    {
      test: /\.(eot|woff|ttf|woff2|svg|gif)(\?|$)/,
      loader: 'file-loader?name=[hash].[ext]'
    },
    {
      test: /\.(png|jpg)$/,
      loader: 'url-loader?limit=1200&name=[hash].[ext]'
    }
  ]
}