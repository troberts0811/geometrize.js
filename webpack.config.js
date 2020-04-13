const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = (env, arg) => {
    let isProduction = false;

    if (typeof env !== 'undefined' && env !== null) {
        isProduction = env.mode === 'production' ? true : false;
    }

    const extractStyles = new MiniCssExtractPlugin({
        filename: './css/[name].css'
    });
    const VueLoaderPlugin = require('vue-loader/lib/plugin');

    return {
        entry: {
            'geometrize': ['babel-polyfill', './src/geometrize.js'],
            'app': ['babel-polyfill', './app.js']
        },
        output:{
            path: path.resolve(__dirname, './dist/', arg.mode + '/',),
            filename: '[name].js',
            globalObject: 'this'
        },
        mode: !isProduction ? 'development' : 'production',
        target: 'web',
        optimization: {
            minimize: isProduction,
            minimizer: [
                new UglifyJsPlugin({
                    cache: true,
                    parallel: true,
                    sourceMap: true
                })
            ]
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
                    use: [
                        {
                            loader: 'vue-style-loader',
                        },
                        {
                            loader: MiniCssExtractPlugin.loader
                        },
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: !isProduction
                            }
                        }
                    ]
                },
                {
                    test: /\.s[ac]ss$/i,
                    use: [
                        {
                            loader: 'vue-style-loader',
                        },
                        {
                            loader: MiniCssExtractPlugin.loader
                        },
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: !isProduction
                            }
                        }, {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: !isProduction
                            }
                        }
                    ]
                },
                {
                    test: /\.vue$/i,
                    loader: 'vue-loader',
                }
            ]
        },
        resolve: {
            alias: {
                geometrize: path.resolve(__dirname, 'src/'),
                ui: path.resolve(__dirname, 'app/'),
                'vue$': 'vue/dist/vue.esm.js'
            },
            extensions: ['*', '.js', '.vue', '.json']
        },
        devServer: isProduction ? {} : {
            contentBase: './',
            publicPath: '/dist/',
            hot: true
        },
        plugins:[
            extractStyles,
            new VueLoaderPlugin
        ].concat(isProduction ? [] : [
            new webpack.NamedModulesPlugin(),
            new webpack.HotModuleReplacementPlugin()
        ])
    }
};
