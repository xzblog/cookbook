/*
 * 后台活动相关接口
 * @author: Magical
 */

const router = require('koa-router')();
const Advertise = require('../model/advertise');

router.get('/', async (ctx)=>{
    ctx.body = {
        code: 0,
        data: 'activety'
    }
});

//添加banner图
router.post('/addBanner', async (ctx)=>{
    const data = ctx.request.body;
    await new Advertise(data).save().then( data => {
        ctx.body = {
            code: 0,
            msg: '添加成功',
            data: data
        }
    }).catch( err =>{
        console.log(err)
    })
});

//修改banner图
router.post('/updateBanner', async (ctx)=>{
    const data = ctx.request.body;
    const id = data._id;
    await Advertise.findByIdAndUpdate(id, data).then( data => {
        ctx.body = {
            code: 0,
            msg: '修改成功',
            data: data
        }
    }).catch( err =>{
        console.log(err)
    })
});


//删除banner图
router.get('/removeBanner', async (ctx)=>{
    const {id} = ctx.query;
    await Advertise.findByIdAndRemove({_id: id}).then( data => {
        ctx.body = {
            code: 0,
            msg: '删除成功',
            data: data
        }
    }).catch( err =>{
        console.log(err)
    })
});


//Banner列表
router.get('/bannerList', async (ctx)=>{
    await Advertise.find().sort({'order':1}).then( data => {
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