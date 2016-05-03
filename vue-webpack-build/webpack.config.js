var webpack = require('webpack');

module.exports = {
    entry:'./src/main.js',
    output: {
        path: './dist',
        publicPath:'dist/',
        filename: 'bundle.js'
    },
    module:{
        loaders:[
            {
                test: /\.vue$/,
                loader:'vue'
            },
            {
                test:/\.(png|jpg|gif)$/,
                loader:'url-loader?limit=8192&name=img/[name].[ext]?[hash]'
            }
        ]
    },
    babel:{
        presets:['es2015','stage-0'],
        plugins:['transform-runtime']
    },
    watch:true
};

if(process.env.NODE_ENV === 'production'){
    module.exports.plugins = [
        new webpack.DefinePlugin({
            'process.env':{
                NODE_ENV:'"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress:{
                warnings: false
            }
        }),
        new webpack.optimize.OccurenceOrderPlugin()
    ]
} else{
    module.exports.devtool = '#source-map'
}

