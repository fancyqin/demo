const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ROOTPATH = path.join(process.cwd());

module.exports = {
    entry: path.join(ROOTPATH,'/src/index.js'),
    output:{
        filename: 'luanda.js',
        path: path.join(ROOTPATH,'/dist')
    },
    module:{
        rules:[
            {
                test:/\.js$/,
                use:'babel-loader',
                exclude: /node_modules/
            },
            {
                test:/\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader:'postcss-loader',
                        options:{
                            plugins: loader => {
                                require('autoprefixer')()
                            }
                        }
                    }
                ]
            },
            {
                test:/\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader:'postcss-loader',
                        options:{
                            plugins: loader => {
                                require('autoprefixer')()
                            }
                        }
                    },
                    'sass-loader'
                ]
            },
            {
                test: /\.(eot|woff|ttf|woff2|svg|gif)(\?|$)/,
                use: 'file-loader'
            },
            {
                test: /\.(png|jpg)$/,
                use: 'url-loader'
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template: path.join(ROOTPATH,'/src/index.html')
        }),
        new MiniCssExtractPlugin({
            filename: 'luanda.css',
            chunkFilename:'[id].css'
        })
    ]
}