/*
 * 管理员信息表
 * @author: Magical
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const admin = new Schema({
    //账号
    username: {type:String, required: true},
    // 密码
    password: {type:String, required: true},
    //头像
    avatar: {type: String},
    //角色
    roles: {type: String},
    //注册时间
    createTime: { type: Date, default: Date.now },
    //更新时间
    updateTime: {type: Date, default: Date.now()},

},{
    timestamps: { createdAt: 'createTime', updatedAt: 'updateTime' }
});


// 把Schema转成Model并导出
module.exports = mongoose.model('Admin', admin);

