var HtmlWebPackPlugin = require('html-webpack-plugin');
var path = require('path');

module.exports = {
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.(png|jpg|gif|svg|woff(2)?|ttf|eot)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]?[hash]'
                }
            },
            {
                test: /.html$/,
                use: ['html-loader']
            }
        ]
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src/')
        },
        extensions: ['*', '.js', '.json'],
        mainFiles: ['index']
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: path.resolve(__dirname, 'src/index.html'),
            filename: './index.html'
        })
    ],
    devtool: 'source-map'
};