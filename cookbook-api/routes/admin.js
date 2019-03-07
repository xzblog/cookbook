/*
 * 后台用户相关接口
 * @author: Magical
 */

const router = require('koa-router')();
const Admin = require('../model/admin');

// 查询所有用户角色
router.get('/', async (ctx) => {
    await Admin.find().then( data => {
        if (data) {
            ctx.body = {
                code: 0,
                msg: '查询成功',
                data: data
            }
        }
    })
});


//登录
router.post('/login', async (ctx) => {
    const {userName, password} = ctx.request.body;
    await Admin.findOne({userName, password}).then( data => {
        if (data) {
            ctx.cookies.set('token', data._id);
            ctx.body = {
                code: 0,
                msg: '登录成功',
                data: {
                    token: data._id
                }
            }
        } else {
            ctx.body = {
                code: 1,
                msg: '登录失败',
                data: data
            }
        }
    }).catch( err =>{
        console.log(err)
    })
});

router.get('/info', async (ctx) => {
    const token = ctx.cookies.get('token');
    await Admin.findById(token).then( data => {
        if(data !== null){
            ctx.body = {
                code: 0,
                msg: '获取用户数据成功',
                data: data
            }
        }else{
            ctx.body = {
                code: 1,
                msg: '没有登录',
                data: data
            }
        }
    }).catch( err =>{
        console.log(err)
    })
})








module.exports = router.routes();