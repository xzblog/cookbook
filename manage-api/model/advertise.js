/*
 * 广告，banner表。
 * @author: Magical
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//定义用户的Schema
const advertise = new Schema({
    // 名称
    title: String,
	// 排序
	order: Number,
	// 类别
	type: String,
	//图片地址
	pic: String,
	//图片描述
	alt: String,
	// 跳转地址
	path: String
});


// 把Schema转成Model并导出
module.exports = mongoose.model('Advertise', advertise);

