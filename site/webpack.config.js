const path = require('path');
const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    module: {
        rules: [{
            test: /\.css$/i,
            use: ["style-loader", "css-loader"],
        }, ],
    },
    plugins: [
        new webpack.optimize.ModuleConcatenationPlugin(),
        new CopyPlugin({
            patterns: [{
                from: path.resolve(__dirname, './node_modules/blockly/media'),
                to: path.resolve(__dirname, 'dist/media')
            }, ],
        }),
        new CopyPlugin({
            patterns: [{
                from: path.resolve(__dirname, './media'),
                to: path.resolve(__dirname, 'dist/media')
            }, ],
        }),

    ],
};