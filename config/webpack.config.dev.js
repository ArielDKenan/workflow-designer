'use strict';

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
// const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
const eslintFormatter = require('react-dev-utils/eslintFormatter');
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');

const getClientEnvironment = require('./env');
const paths = require('./paths');
const ManifestPlugin = require('webpack-manifest-plugin');

const publicPath = '/';
const publicUrl = '';
const env = getClientEnvironment(publicUrl);

module.exports = {
    mode: 'development',
    devtool: 'cheap-module-source-map',
    entry: [
        require.resolve('react-dev-utils/webpackHotDevClient'),
        paths.appIndexJs
    ],
    output: {
        // Add /* filename */ comments to generated require()s in the output.
        pathinfo: true,
        // This does not produce a real file. It's just the virtual path that is
        // served by WebpackDevServer in development. This is the JS bundle
        // containing code from all our entry points, and the Webpack runtime.
        filename: 'static/js/bundle.js',
        // There are also additional JS chunk files if you use code splitting.
        chunkFilename: 'static/js/[name].chunk.js',
        // This is the URL that app is served from. We use "/" in development.
        publicPath: publicPath,
        // Point sourcemap entries to original disk location (format as URL on Windows)
        devtoolModuleFilenameTemplate: info =>
            path.resolve(info.absoluteResourcePath).replace(/\\/g, '/')
    },
    optimization: {
        // Automatically split vendor and commons
        splitChunks: {
            chunks: 'all',
            name: 'vendors'
        },
        // Keep the runtime chunk seperated to enable long term caching
        runtimeChunk: true
    },
    resolve: {
        modules: ['node_modules'].concat(
            process.env.NODE_PATH.split(path.delimiter).filter(Boolean)
        ),
        extensions: ['.mjs', '.js', '.json', '.jsx'],
        plugins: [
            // Prevents users from importing files from outside of src/ (or node_modules/).
            new ModuleScopePlugin(paths.appSrc, [paths.appPackageJson])
        ]
    },
    module: {
        strictExportPresence: true,
        rules: [
            { parser: { requireEnsure: false } },
            {
                test: /\.(js|jsx|mjs)$/,
                enforce: 'pre',
                use: [
                    {
                        options: {
                            formatter: eslintFormatter,
                            eslintPath: require.resolve('eslint')
                        },
                        loader: require.resolve('eslint-loader')
                    }
                ],
                include: paths.srcPaths,
                exclude: [/[/\\\\]node_modules[/\\\\]/]
            },
            {
                oneOf: [
                    {
                        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                        loader: require.resolve('url-loader'),
                        options: {
                            limit: 10000,
                            name: 'static/media/[name].[hash:8].[ext]'
                        }
                    },
                    {
                        test: /\.(js|jsx|mjs)$/,
                        include: paths.srcPaths,
                        exclude: [/[/\\\\]node_modules[/\\\\]/],
                        use: [
                            require.resolve('thread-loader'),
                            {
                                loader: require.resolve('babel-loader'),
                                options: {
                                    cacheDirectory: true,
                                    highlightCode: true
                                }
                            }
                        ]
                    },
                    // Process any JS outside of the app with Babel.
                    {
                        test: /\.js$/,
                        use: [
                            require.resolve('thread-loader'),
                            {
                                loader: require.resolve('babel-loader'),
                                options: {
                                    cacheDirectory: true,
                                    highlightCode: true
                                }
                            }
                        ]
                    },
                    {
                        test: /\.(scss|sass)$/,
                        use: [
                            require.resolve('style-loader'),
                            {
                                loader: require.resolve('css-loader'),
                                options: { importLoaders: 2 }
                            },
                            require.resolve('sass-loader')
                        ]
                    },
                    {
                        exclude: [/\.(js|jsx|mjs)$/, /\.html$/, /\.json$/],
                        loader: require.resolve('file-loader'),
                        options: {
                            name: 'static/media/[name].[hash:8].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            template: paths.appHtml
        }),
        // new InterpolateHtmlPlugin(env.raw),
        new webpack.DefinePlugin(env.stringified),
        new webpack.HotModuleReplacementPlugin(),
        new CaseSensitivePathsPlugin(),
        new ManifestPlugin({
            fileName: 'asset-manifest.json',
            publicPath: publicPath
        })
    ],
    node: {
        dgram: 'empty',
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
        child_process: 'empty'
    },
    performance: false
};
