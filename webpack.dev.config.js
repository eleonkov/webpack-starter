const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/main.js',
    output: {
        filename: '[name].[hash].js',
        path: path.resolve(__dirname, 'public')
    },
    mode: 'development',
    devServer: {
        contentBase: path.resolve(__dirname, 'public'),
        compress: true,
        port: 9000
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                use: ['html-loader']
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.(eot|otf|ttf|woff|woff2)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[contenthash].[ext]',
                        outputPath: 'fonts'
                    }
                }
            },
            {
                test: /\.(gif|png|jpe?g|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            name: '[name].[ext]',
                            outputPath: './images'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            chunks: ['main'],
            template: './src/views/index.html',
            favicon: './src/images/favicon.ico'
        })
    ]
};