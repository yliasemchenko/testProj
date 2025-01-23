const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = (env) => {

    const isDev = env.mode === 'development'

    const config = webpack.Configuration = {
        mode: env.mode ?? 'development',
        entry: ["@babel/polyfill", path.resolve(__dirname, 'src/js', 'index.js')],
        output: {
            path: path.resolve(__dirname, 'build'),
            filename: '[name].[contenthash].js',
            clean:true
        },
        plugins: [
            new HtmlWebpackPlugin( {
                template: path.resolve(__dirname, 'src', 'index.html')
            }),
            new MiniCssExtractPlugin({
                filename: 'css/[name].[contenthash].css'
            }),
        ],
        devtool: isDev && "inline-source-map",
        devServer: isDev ? {
            port: 3000,
            open:true,
            hot: true, 
        } : undefined,

        module: {
            rules: [
                {
                    test: /\.html$/i,
                    loader:'html-loader'
                },
                {
                    test: /\.s[ac]ss$/i,
                    use: [
                        MiniCssExtractPlugin.loader,
                        "css-loader",
                        "sass-loader",
                    ],
                },
                {
                    test: /\.woff2?$/i,
                    type: 'asset/resource',
                    generator: {
                        filename: 'fonts/[name][ext]',
                    },
                },
                {
                    test: /\.(jpe?g|png|webp|gif|svg)$/i,
                    use: isDev
                    ? []
                    : [
                        {
                            loader: 'image-webpack-loader',
                            options: {
                                mozjpeg: {
                                    progressive: true,
                                },
                                optipng: {
                                    enabled: false,
                                },
                                pngquant: {
                                    quality: [0.65, 0.9],
                                    speed: 4,
                                },
                                gifsicle: {
                                    interlaced: false,
                                },
                                webp: {
                                    quality: 75,
                                },
                            },
                        },
                    ],
                    type: 'asset/resource',
                },
                {
                    test: /\.(?:js|mjs|cjs)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                        targets: "defaults",
                        presets: [
                            ['@babel/preset-env']
                        ]
                        }
                    }
                }
            ]
        }
    }

    return config
}