var path = require("path");
var webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const {
    CleanWebpackPlugin
} = require("clean-webpack-plugin");

module.exports = (env, options) => {
    return {
        entry: {
            app: "./src/app.js",
        },
        output: {
            path: path.join(__dirname, "dist"),
            publicPath: "/",
            clean: true,
        },
        performance: {
            hints: false,
            maxEntrypointSize: 512000,
            maxAssetSize: 512000
        },
        watch: options.mode === "development",
        devtool: options.mode === "development" && "inline-source-map",
        devServer: {
            static: {
                directory: path.join(__dirname, "dist"),
            },
            hot: false,
            historyApiFallback: true,
            open: true,
            port: 3000,
        },
        module: {
            rules: [

                {
                    test: /\.pug$/,
                    include: path.join(__dirname, "src/pages/"),
                    use: [
                        "file-loader?name=[name].html",
                        "pug-html-loader?pretty&exports=false",
                    ],
                },
                {
                    test: /\.(ttf|otf|woff(2)?)$/,
                    include: path.join(__dirname, "src/fonts/"),
                    use: [
                        "file-loader?name=[name].[ext]&outputPath=/fonts&context=/",
                    ],
                },
                {
                    test: /\.(jpe?g|png|gif|svg)$/i,
                    type: "asset",
                },
                {
                    test: /\.scss$/,
                    exclude: /node_modules/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader',
                            options: {
                                url: false
                            }
                        },
                        'fast-sass-loader',
                    ]
                },
                {
                    test: /\.*$/,
                    include: path.join(__dirname, "src/assets/"),
                    use: [
                        "file-loader?name=[name].[ext]&outputPath=/assets",
                    ],
                },
            ],
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin(),
            new MiniCssExtractPlugin({
                filename: 'styles/styles.css'
            }),
            new ImageMinimizerPlugin({
                minimizer: {
                    implementation: ImageMinimizerPlugin.imageminMinify,
                    options: {
                        plugins: [
                            ["gifsicle", {
                                interlaced: true
                            }],
                            ["jpegtran", {
                                progressive: true
                            }],
                            ["optipng", {
                                optimizationLevel: 5
                            }],
                            [
                                "svgo",
                                {
                                    plugins: [{
                                            name: 'preset-default',
                                            params: {
                                                overrides: {
                                                    convertShapeToPath: {
                                                        convertArcs: true
                                                    },
                                                    convertPathData: false
                                                }
                                            }
                                        },
                                        {
                                            name: "removeViewBox",
                                            active: false,
                                        },
                                        {
                                            name: "addAttributesToSVGElement",
                                            params: {
                                                attributes: [{
                                                    xmlns: "http://www.w3.org/2000/svg"
                                                }],
                                            },
                                        },
                                    ],
                                },
                            ],
                        ],
                    },
                },
            }),
            new CleanWebpackPlugin(),
            new webpack.ProgressPlugin(),
        ],
    }
}