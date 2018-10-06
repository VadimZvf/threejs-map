const webpack = require('webpack');
const path = require('path');
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
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                            minimize: false
                        }
                    },
                    'postcss-loader'
                ]
            }
        ]
    },

    devtool: 'source-map',

    mode: 'development',

    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        }),
        new webpack.BannerPlugin(`${pkg.name}-${new Date()}. DEBUG. byndyusoft`),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('debug')
            },
            PROJECT_ENV: JSON.stringify('debug')
        })
    ],

    devServer: {
        contentBase: path.join(__dirname, '../build'),
        compress: true
    }
};
