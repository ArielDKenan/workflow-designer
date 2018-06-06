'use strict';

const path = require('path');
const {DllPlugin, DefinePlugin} = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');

var webpackConfig = {
	mode: 'production',
	performance: { hints: false },
	entry: {
		vendor: [
			'axios',
			'react',
			'react-dom',
			'react-redux',
			'react-redux-i18n',
			'react-router-dom',
			'redux',
			'redux-saga',
			'redux-thunk'
		]
	},
	resolve: {
		modules: [path.resolve('.'), path.join(__dirname, 'node_modules')]
	},
	output: {
		path: __dirname + '/libs',
		filename: '[name].dll.js',
		library: '[name]'
	},
	module: {
		rules: [
			{test: /\.(js|jsx)$/, loader: 'source-map-loader', exclude: [/node_modules/], enforce: 'pre'},
			{test: /\.(js|jsx)$/, loader: 'babel-loader', exclude: /node_modules/},
			{test: /\.html$/, loader: 'html-loader', exclude: /node_modules/},
			{test: /\.(css|scss)$/, loaders: ["style-loader", "css-loader", "sass-loader"]}
		]
	},
	plugins: [
		new CleanWebpackPlugin(
			['libs/vendor*'],
			{watch: false}),
		new DllPlugin({
			name: '[name]',
			path: path.resolve(__dirname, './libs') + '/[name].json'
		})
	]
};
module.exports = webpackConfig;
