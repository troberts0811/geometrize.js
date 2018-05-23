const path = require('path');
const webpack = require('webpack');
const isProduction = process.env.NODE_ENV === 'production' ? true : false;
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractStyles = new ExtractTextPlugin({
    filename: "./dist/" + process.env.NODE_ENV + "/[name].css"
});

module.exports = {
    entry: ["babel-polyfill", "./index.js"],
    output:{
        path: path.resolve(__dirname, './dist/', process.env.NODE_ENV + '/',),
        filename: 'geometrize.js'
    },
    module:{
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/i,
                use: extractStyles.extract({
                    use: [
                        {
                            loader: "css-loader",
                            options: {
                                sourceMap: true
                            }
                        }
                    ]
                })
            },
            {
                test: /\.s[ac]ss$/i,
                use: extractStyles.extract({
                    use: [
                        {
                            loader: "css-loader",
                            options: {
                                sourceMap: true
                            }
                        }, {
                            loader: "sass-loader",
                            options: {
                                sourceMap: true
                            }
                        }
                    ]
                })
            }
        ]
    },
    resolve:{
        extensions: ['*', '.js', '.json']
    },
    devServer: isProduction ? {} : {
        contentBase: './dist',
        hot: true
    },
    plugins:[
        extractStyles
    ].concat(isProduction ? [
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            compress: {
                warnings: false
            }
        })
    ] : [
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ])
};
