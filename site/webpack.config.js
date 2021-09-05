const webpack = require('webpack');

const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CompressionPlugin = require("compression-webpack-plugin");

const zlib = require("zlib");
const path = require('path');

const isDevelopment = process.env.NODE_ENV !== 'production'

module.exports = {
    mode: isDevelopment ? 'development' : 'production',
    module: {
        rules: [{
                test: /\.module\.s(a|c)ss$/,
                use: [MiniCssExtractPlugin.loader, {
                    loader: 'css-loader',
                    options: {
                        modules: true,
                    }
                }, 'postcss-loader', 'sass-loader']
            },
            {
                test: /\.s(a|c)ss$/,
                exclude: /\.module.(s(a|c)ss)$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader']
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: ["babel-loader"]    
            }
        ]
    },

    plugins: [
        new webpack.optimize.ModuleConcatenationPlugin(),
        new MiniCssExtractPlugin({
            filename: isDevelopment ? '[name].css' : '[name].[contenthash].css',
            chunkFilename: isDevelopment ? '[id].css' : '[id].[contenthash].css'
        }),
        new CopyPlugin({
            patterns: [{
                from: path.resolve(__dirname, './node_modules/blockly/media'),
                to: path.resolve(__dirname, './dist/media')
            }, ],
        }),
        new CopyPlugin({
            patterns: [{
                from: path.resolve(__dirname, './media'),
                to: path.resolve(__dirname, './dist/media')
            }, ],
        }),
        new HtmlWebpackPlugin({ template: "./index.html", inject: false }),
        new CompressionPlugin({
            filename: "compressed/[path][base].br",
            algorithm: "brotliCompress",
            threshold: 1400,
            test: /\.js(\?.*)?$|\.html|\.css|\.svg/i,
        }),
        new CompressionPlugin({
            filename: "compressed/[path][base].gz",
            algorithm: "gzip",
            threshold: 1400,
            test: /\.js(\?.*)?$|\.html|\.css|\.svg/i,
        })
    ],
    resolve: {
        extensions: ['.js', '.jsx', '.scss', ".ts", ".tsx"]
    },
    output: {
        clean: true,
        filename: isDevelopment ? '[name].js' : '[name].[contenthash].js'
    },
    optimization: {
        moduleIds: "hashed",
        runtimeChunk: {     
            name: "manifest",
        },
        minimizer: [
            `...`,
            new CssMinimizerPlugin(),
        ],
        splitChunks: {
            cacheGroups: {
                commons: {
                    name: 'commons',
                    chunks: 'initial',
                    minChunks: 2,
                },
                vendors: {
                  test: /[\\/]node_modules[\\/]/,
                  name: 'node_vendors',
                  chunks: 'all',
                },
            },
        }
    },
}