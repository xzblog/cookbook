/*
 * 菜谱相关路由文件
 *  @Author: Miracle
 */

const router = require('koa-router')();
const Classify = require('../model/classify');

// 添加分类
router.post('/', async (ctx)=>{
    const data = ctx.request.body;
    await new Classify(data).save().then( data => {
        ctx.body = {
            code: 0,
            msg: '添加成功',
            data: data
        }
    }).catch( err =>{
        console.log(err)
    })
});

// 删除分类
router.del('/:id', async (ctx)=>{
    const {id} = ctx.params;
    await Classify.findByIdAndRemove({_id: id}).then( data => {
        ctx.body = {
            code: 0,
            msg: '删除成功',
            data: data
        }
    }).catch( err =>{
        console.log(err)
    })
});

// 修改分类
router.put('/:id', async (ctx)=>{
    const data = ctx.request.body;
    const {id} = ctx.params;
    await Classify.findByIdAndUpdate(id, data, {new:true}).then( data => {
        ctx.body = {
            code: 0,
            msg: '修改成功',
            data: data
        }
    }).catch( err =>{
        console.log(err)
    })
});

// 查询分类
router.get('/', async (ctx)=>{
    let { page = 1, size = 10 } = ctx.query;

    // 查询数据库符合条件的数据数量
    const  total = await Classify.estimatedDocumentCount();

    // 得到总页数，向上取整
    const pages = Math.ceil(total / size);

    //页数最低不能低于1
    page = Math.max(page,1);

    // 最高不能高于总页数
    page = Math.min(page, pages);

    const skip = (page - 1) * size ;

    await Classify.find({}, {__v: 0}, {limit: Number(size), skip}).sort({_id: -1}).then( data => {
        ctx.body = {
            code: 0,
            msg: '查询成功',
            data: {
                content: data,
                total,
                pages
            }
        }
    }).catch( err =>{
        console.log(err)
    })
});


module.exports = router.routes();
