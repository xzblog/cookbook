/*
 * webpack开发环境配置
 * @Author: Magical
 */

const path = require('path');
const merge = require('webpack-merge');
const autoprefixer = require('autoprefixer');                     //添加浏览器前缀
const common = require('./webpack.config.common.js');
const {server} = require('./config');

module.exports = merge(common, {

	mode: 'development',

	entry:{
		main:[
			// 开启 React 代码的模块热替换(HMR)
			'react-hot-loader/patch',
		]
	},
	module: {
		rules: [
			{
				test: /\.s?css$/,
				use: [
					"style-loader",
					{ loader: 'css-loader', options: { sourceMap: true } },  //支持在浏览器查看样式源文件
					{
						loader:'postcss-loader',
						options: {
							ident: 'postcss',
							plugins:  [
								require('postcss-flexbugs-fixes'),
								autoprefixer({
									browsers: [
										'>1%',
										'last 4 versions',
										'Firefox ESR',
										'not ie < 9', // doesn't support IE8 anyway
									],
									flexbox: 'no-2009',
								}),
							]
						}

					},
					'sass-loader'
				]
			},
		]
	},

	devtool: 'cheap-module-source-map',

	devServer: {
		open: true,   //自动打开浏览器
		port: server.port, // 端口
		host: server.host, //外部ip
		compress: true,       //启用压缩
		publicPath: '/',
		//stats: "errors-only",  //只显示错误信息
		historyApiFallback: true,  //在用HTML5 History API（如BrowserRouter）时，我们在跳转链接后刷新页面或者直接输入链接访问时是会显示404,开启此项后可避免
		contentBase: path.join(__dirname, "../dist"),   //告诉服务从哪里读取内容
		disableHostCheck: true,  //用于映射外网，平时建议关闭
		overlay: {         //浏览器上显示错误和警告
			// warnings: true,
			errors: true
		},
		proxy: server.proxy   //代理
	},
});