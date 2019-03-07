/*
 * 用户信息表
 * @author: Magical
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//定义用户的Schema
const user = new Schema({
    // 手机号
    mobile: {type:String,required: true},
    // 昵称
    nickname: String,
    // 语录
    saying: String,
    // 头像
    avatar: String,
	// 收藏
	collect: Array,
    //注册时间
    createTime: { type: Date, default: Date.now },
    //更新时间
    updateTime: {type: Date, default: Date.now()},

},{
    timestamps: { createdAt: 'createTime', updatedAt: 'updateTime' }
});


// 把Schema转成Model并导出
module.exports = mongoose.model('User', user);

