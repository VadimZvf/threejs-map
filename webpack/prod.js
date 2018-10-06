const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const pkg = require('../package.json');

module.exports = {
    entry: {
        index: path.join(__dirname, '../src', 'index.js')
    },

    output: {
        path: path.join(__dirname, '../build'),
        filename: '[name].js',
        publicPath: '/'
    },

    module: {
        rules: [
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                test: /\.(png|jpg|svg|gif)$/,
                use: 'file-loader?name=img/[name].[hash].[ext]'
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '/'
                        }
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: false,
                            minimize: true
                        }
                    },
                    'postcss-loader'
                ]
            }
        ]
    },

    devtool: false,

    mode: 'production',

    optimization: {
        minimizer: [new UglifyJsPlugin({})]
    },

    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        }),
        new MiniCssExtractPlugin('index.css'),
        new webpack.BannerPlugin(`${pkg.name}-${new Date()}. RELEASE. byndyusoft`),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            },
            PROJECT_ENV: JSON.stringify('production')
        })
    ]
};
