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
    const { limit, ...rest } = ctx.query;

    await Classify.find(rest, { _v: 0 }, { limit: Number(limit) }).sort({_id: -1}).then( data => {
        ctx.body = {
            code: 0,
            msg: '查询成功',
            data: data
        }
    }).catch( err =>{
        console.log(err)
    })
});


module.exports = router.routes();
