const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const errorOverlayMiddleware = require('react-dev-utils/errorOverlayMiddleware');
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin')

module.exports = (env, argv) => {

    const isProd = argv.mode === 'production'
    const isDev = argv.mode === 'development'

    const getStyleLoaders = () => {
        return [
            isProd ? MiniCssExtractPlugin.loader : 'style-loader',
            'css-loader'
        ]
    }

    return {
        mode: isProd ? 'production' : isDev && 'development',
        devServer: {
            open: true,
            overlay: true
        },
        module: {
            rules: [
                //Babel
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader'
                },

                //Loading images
                {
                    test: /\.(png|jpg|jpeg|gif|ico)$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                outputPath: 'images',
                                name: '[name]-[sha1:hash:7].[ext]'
                            }
                        }
                    ]
                },
                //Loading fonts
                {
                    test: /\.(ttf|otf|eot|woff|woff2)$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                outputPath: 'fonts',
                                name: '[name].[ext]'
                            }
                        }
                    ]
                },
                //Loading css
                //порядок loaders имеет значение, как в func compose 
                //сначала 'css-loader', потом 'style-loader' 
                {
                    test: /\.css$/,
                    use: getStyleLoaders()
                },
                //Loading sass/scss
                {
                    test: /\.(s[ac]ss)$/,
                    use: [...getStyleLoaders(), 'sass-loader']
                }
            ]
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: 'main.css'
            }),
            new HtmlWebpackPlugin({
                title: 'Hello World',
                buildTime: new Date().toString(),
                template: 'public/index.html'
            }),
            new ErrorOverlayPlugin()
        ]

    }
}