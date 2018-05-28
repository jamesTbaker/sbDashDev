
// eslint-disable-next-line
const webpack = require('webpack');
// eslint-disable-next-line
const merge = require('webpack-merge');
// eslint-disable-next-line
const HtmlWebpack = require('html-webpack-plugin');
const baseConfig = require('./webpack.base.0.0.1.config.js');
const path = require('path');

module.exports = merge(baseConfig, {
	entry: {
		index: './fairhaven-design/docs/doc.js',
	},
	output: {
		path: path.join(__dirname, '../fairhaven-design/dist'),
		filename: 'fairhaven.www.0.0.1.dev.js',
	},
	resolve: {
		alias: {
			'fairhaven-design': path.join(__dirname, '../fairhaven-design/src'),
		},
	},
	module: {
		loaders: [
			{
				include: path.join(__dirname, '../fairhaven-design'),
				test: /\.js$/,
				loader: 'babel-loader',
			},
		],
	},
	plugins: [
		new HtmlWebpack({
			template: path.join(__dirname, '../fairhaven-design/docs', 'index.html'),
			hash: true,
		}),
		new webpack.HotModuleReplacementPlugin(),
	],
	devServer: {
		contentBase: path.join(__dirname, '../fairhaven-design/docs'),
		hot: true,
		host: '192.168.0.15', // set to VirtualBox IP so it can be accessed outside VBox
		port: 5001,
	},
});
