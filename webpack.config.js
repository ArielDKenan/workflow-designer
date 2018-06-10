'use strict';

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const { HotModuleReplacementPlugin, DefinePlugin } = require('webpack');
const apiMocker = require('webpack-api-mocker');
const devConfig = require('./tools/getDevConfig');
const proxyServer = require('./tools/proxy-server');
const DEV = process.argv[1].indexOf('webpack-dev-server') >= 0;

module.exports = env => {
    let srcPath = [path.resolve(__dirname, 'src')];
    let modulePath = [path.resolve('.'), path.join(__dirname, 'node_modules')];

    let webpackConfig = {
        performance: { hints: false },
        mode: DEV ? 'development' : 'production',
        entry: [__dirname + '/src/Index.js'],
        devtool: DEV ? 'eval-source-map' : 'none',
        resolve: {
            modules: modulePath,
            alias: {
                // for shared components
            }
        },
        output: {
            path: __dirname + '/dist',
            publicPath: '/dist/',
            filename: 'bundle.js'
            // filename: 'index_bundle_[hash].js'
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    include: srcPath,
                    use: [{ loader: 'babel-loader' }]
                },
                {
                    test: /\.(js|jsx)$/,
                    loader: 'source-map-loader',
                    include: srcPath,
                    enforce: 'pre'
                },
                {
                    test: /\.(css|scss)$/,
                    use: [
                        {
                            loader: 'style-loader'
                        },
                        {
                            loader: 'css-loader'
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                output: { path: path.join(__dirname, 'dist') }
                            }
                        }
                    ],
                    include: [/resources/, path.join(__dirname, 'node_modules')]
                }
            ]
        },
        plugins: [
            new DefinePlugin({
                DEBUG: DEV === true
            }),
            new HtmlWebpackPlugin({
                filename: 'index.html',
                template: __dirname + '/index.html'
            })
        ]
    };

    if (DEV) {
        webpackConfig.devServer = {
            // before(app) {
            //     apiMocker(app, path.resolve('./tools/mocks/mock.js')),
            //         proxyServer(app);
            // },
            port: devConfig.port,
            historyApiFallback: true,
            publicPath: `http://localhost:${devConfig.port}/dist`,
            contentBase: [
                path.join(__dirname, 'dist'),
                path.join(__dirname, 'libs')
            ],
            inline: true,
            hot: true,
            stats: {
                colors: true,
                exclude: ['node_modules']
            }
        };
        webpackConfig.plugins.push(new HotModuleReplacementPlugin());
    } else {
        webpackConfig.plugins.push(new UglifyJsPlugin());
        webpackConfig.module.rules.push({
            enforce: 'pre',
            test: /\.(js|jsx)$/,
            include: srcPath,
            use: [
                {
                    loader: 'eslint-loader'
                }
            ]
        });
    }
    return webpackConfig;
};
