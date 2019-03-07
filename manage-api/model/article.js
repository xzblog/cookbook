/*
 * 菜谱文章
 * @Author: Miracle
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//定义用户的Schema
const article = new Schema({
    // 类别
    type: {
        type: Array,
        require: true
    },
    // 状态  草稿: draft, 已发布：publish
    status: {
        type: String,
        default: 'publish'
    },
    // 标题
    title: {
        type: String,
        require: true
    },
    // 封面图
    cover: {
        type: String,
        require: true
    },
    // 作者（后端自己获取）
    author: String,
    // 浏览量
    lookNum: {
        type: Number,
        default: 0
    },
    // 收藏量
    likeNum: {
        type: Number,
        default: 0
    },
    // 是否热门
    hot: {
        type: Boolean,
        default: false
    },
    // 描述
    describe: {
        type: String,
        require: true
    },
    // 食材
    materials: {
        type: Array,
        require: true
    },
    // 做法
    content: {
        type: String,
        require: true
    },
    //添加时间
    createTime: { type: Date, default: Date.now()},
    //更新时间
    updateTime: {type: Date, default: Date.now()},

},{
    timestamps: { createdAt: 'createTime', updatedAt: 'updateTime' }
});


// 把Schema转成Model并导出
module.exports = mongoose.model('Article', article);

