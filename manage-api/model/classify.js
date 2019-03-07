/*
 * 菜谱分类
 * @Author: Miracle
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//定义用户的Schema
const classify = new Schema({
    // 分类名称
    name: {
        type: String,
        required: true
    },
    // 封面图
    cover: {
        type: String,
        required: true
    },
    // 是否推荐
    recommend: {
        type: Boolean,
        default: false
    },
    // 是否热门
    hot: {
        type: Boolean,
        default: false
    },
    // 类型， 1. material: 食材，2. cuisine: 菜系， 3. bake: 烘培， 4. occasion: 场合， 5. festival: 节日, 6. style: 菜式
    type: {
        type: String,
        required: true
    },
});


// 把Schema转成Model并导出
module.exports = mongoose.model('Classify', classify);

