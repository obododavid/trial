const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const mode = process.env.NODE_ENV || 'development';
const isDevelopment = mode === 'development';

module.exports = {
    mode: mode,
    entry: "./js/main.js",
    output: {
        filename: "[name].[hash].bundle.js",
        path: path.resolve(__dirname, "dist")
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: isDevelopment ? "[name].css" : "[chunkhash]-[name].css",
            chunkFilename: isDevelopment ? "[id].css" : "[chunkhash]-[id].css"
        }),
        new HtmlWebpackPlugin({
            template: 'index.html',
            filename: 'index.html'
        }),
        new HtmlWebpackPlugin({
            template: 'about.html',
            filename: 'about.html'
        }),
        new HtmlWebpackPlugin({
            template: 'services.html',
            filename: 'services.html'
        }),
        new HtmlWebpackPlugin({
            template: 'contact.html',
            filename: 'contact.html'
        }),
        new HtmlWebpackPlugin({
            template: 'cloud_services.html',
            filename: 'cloud_services.html'
        }),
        new HtmlWebpackPlugin({
            template: 'sap_on_azure.html',
            filename: 'sap_on_azure.html'
        }),
        new CleanWebpackPlugin(),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        }),
    ],
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.(png|jpe?g|gif|svg|ttf|woff|eot)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: "[name].[hash].[ext]",
                            outputPath: "imgs"
                        }
                    },
                ],
            },
            {
                test: /\.html$/i,
                loader: 'html-loader',
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.exec\.js$/,
                use: ['script-loader']
            }
        ]
    },
    devServer: {
        contentBase: path.resolve(__dirname, "dist"),
        port: 3000,
        compress: true
    }
}