
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
		index: './src/components.www/SBMedia/SBMedia.Cont.www.js',
	},
	output: {
		path: path.join(__dirname, '../www'),
		filename: 'SBMedia.www.0.0.1.dev.js',
	},
	module: {
		loaders: [
			{
				include: path.join(__dirname, '../src'),
				test: /\.js$/,
				loader: 'babel-loader',
			}, {
				include: path.join(__dirname, '../src'),
				test: /\.sass$/,
				loader: 'style-loader!css-loader!postcss-loader!sass-loader',
			}, {
				include: path.join(__dirname, '../src'),
				test: /\.(jpg|png)$/,
				use: {
					loader: 'file-loader',
					options: {
						name: '[name].[ext]',
						outputPath: 'img/',
						publicPath: 'img/',
					},
				},
			},
			{
				test: /\.(ttf|eot|woff|woff2|svg)$/,
				use: {
					loader: 'file-loader',
					options: {
						name: 'fonts/[name].[ext]',
					},
				},
			},
		],
	},
	plugins: [
		new HtmlWebpack({
			template: path.join(__dirname, '../src', 'index.html'),
			hash: true,
		}),
		new webpack.HotModuleReplacementPlugin(),
	],
	devtool: 'eval-source-map',
	devServer: {
		contentBase: path.join(__dirname, '../www/js'),
		hot: true,
		host: '192.168.0.15', // set to VirtualBox IP so it can be accessed outside VBox
		port: 4001,
	},
});
