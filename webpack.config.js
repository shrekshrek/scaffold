const path = require('path');
const webpack = require('webpack');
// const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: {
        main: './src/main.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        publicPath: './dist/',
        chunkFilename: "[name].chunk.js?v=[hash:8]"
    },
    optimization: {
        // runtimeChunk: true,
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -20
                },
                commons: {
                    name: "common",
                    chunks: "initial",
                    minChunks: 2
                }
            }
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.glsl$/,
                use: ['glsl-loader']
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                use: ['url-loader?limit=50000&name=assets/[name]_[hash:5].[ext]']
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: ['url-loader']
            },
            {
                test: /\.html$/,
                use: ['html-loader?minimize=true']
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader']
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.json', ".jsx", ".css"],
        alias: {
            core: path.resolve(__dirname, 'src/core'),
            dom: path.resolve(__dirname, 'src/dom'),
            flash: path.resolve(__dirname, 'src/flash'),
            three: path.resolve(__dirname, 'src/three'),
            video: path.resolve(__dirname, 'src/video'),
            libs: path.resolve(__dirname, 'src/libs'),

            jquery: 'libs/jquery/jqlite.min',
            jstween: 'libs/jstween/jstween.min',
            jstimeline: 'libs/jstween/jstimeline.min',
            jsparallax: 'libs/jstween/jsparallax.min',

        }
    },
    externals: {
        jquery: '$',
    },
    plugins: [
        // new CleanWebpackPlugin(['dist']),
    ]
};