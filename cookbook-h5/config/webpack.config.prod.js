/*
 * webpack生产环境配置
 * @Author: Magical
 */

const path = require('path');
const merge = require('webpack-merge');                      //配置文件合并
const autoprefixer = require('autoprefixer');                     //添加浏览器前缀
const CleanWebpackPlugin = require('clean-webpack-plugin');  //打包前先清除dist文件
const ExtractTextPlugin = require("extract-text-webpack-plugin"); //抽离css
const common = require('./webpack.config.common.js');

module.exports = merge(common, {
	mode: 'production',
	module:{
		rules:[
			{
				test: /\.s?css$/,
				use: ExtractTextPlugin.extract({
					fallback: "style-loader",
					use: [
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
				}),
			},
		]
	},
	plugins: [
		new CleanWebpackPlugin(['dist'],{root: path.resolve(__dirname,'../')}),   //打包前先清空下这个文件
		new ExtractTextPlugin({
			filename:"css/[name].css",
			disable:false,	//是否禁止使用插件
			allChunks:true, //是否将所有额外的chunk都压缩成一个文件
		}),
		// webpack.optimization.runtimeChunk = true,       //自动拆分运行时的公共文件   
	]
});