/*
 *  文章相关路由文件
 *  @Author: Miracle
 */

const router = require('koa-router')();
const Article = require('../model/article');
const User = require('../model/user');

// 收藏
router.put('/:id', async (ctx) => {
    const {id} = ctx.params;
    const userId = ctx.cookies.get('userId');
    const userInfo = await User.findById(userId);
    if (userInfo) {  // 用户已登录
        // 判断该文章是否已经收藏过了
        const isDouble = userInfo.collect.some(item => {
            return String(item._id) === id
        });
        if (!isDouble) {
            // 更新文章收藏量
            const articleDetails = await Article.findByIdAndUpdate(id, { $inc: { likeNum: 1 } }, { new: true, upsert: true })
            // 过滤所需字段
            const obj = {}
            obj._id = articleDetails._id;
            obj.title = articleDetails.title;
            obj.cover = articleDetails.cover;
            await User.findByIdAndUpdate(userId, {$push: {collect: obj}}, {new: true, upsert: true }).then(()=> {
                ctx.body = {
                    code: 0,
                    msg: '收藏成功',
                    data: articleDetails
                }
            }).catch(err => {
                console.log(err)
            })
        } else {
            ctx.body = {
                code: 1,
                msg: '请勿重复收藏'
            }
        }
    } else {
        ctx.body = {
            code: 403,
            msg: '用户未登录',
            data: userInfo
        }
    }
});

// 查询文章列表
router.get('/', async (ctx) => {
    const { size = 10, type, title } = ctx.query;
    let { page = 1 } = ctx.query;
    const options = {};

    if(type){
        options.type = type;
    }
    if(title){
        options.title = new RegExp(title,'i');  // 变成正则，用于模糊查询
    }

    // 查询数据库符合条件的数据数量
    const  total = await Article.estimatedDocumentCount(options);

    // 得到总页数，向上取整
    const pages = Math.ceil(total / size);

    //页数最低不能低于1
    page = Math.max(page,1);

    // 最高不能高于总页数
    page = Math.min(page, pages);

    const skip = (page - 1) * size ;

    await Article.find( options, {__v: 0}, {limit: Number(size), skip}).sort({'_id':-1}).then((data)=>{
        ctx.body = {
            code: 0,
            msg: '查询成功',
            data: {
                content: data,
                total,
                pages
            }
        }
    });
});

// 查询文章详情
router.get('/:id', async (ctx) => {
    const { id } = ctx.params;
    //查询成功一次及浏览量增加一次
    await Article.findByIdAndUpdate({ _id: id }, { $inc: { lookNum: 1 } }, { new: true, upsert: true }).then( data => {
        ctx.body = {
            code: 0,
            msg: '查询成功',
            data: data
        }
    });
});

module.exports = router.routes();
