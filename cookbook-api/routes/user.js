/*
 * 用户相关
 * @Author: Miracle
 */

const router = require('koa-router')();
const User = require('../model/user');

const globalObj = { //全局变量
    mobile: '',
    random: ''
};

/*
* 获取验证码
* @param: mobile
* @returns: {}
*/
router.post('/getVCode', async (ctx)=> {
    const {mobile} = ctx.request.body;
    // 生成4位数的随机数
    const random = Math.floor(Math.random()*9000) + 1000;

    //赋值给全局变量方便其他函数获取,如注册是判断发验证码的手机是否等于注册手机号
    globalObj.mobile = mobile;
    globalObj.random = random;

    ctx.body = {code:0, msg: '获取成功', data: random};
});

/*
 * 登录/注册
 * @param: mobile、vCode
 * @returns: {}
 */
router.post('/login', async (ctx)=> {
    const {mobile, vCode} = ctx.request.body;

    //判断注册手机是否 = 获取验证码手机
    if(mobile !== globalObj.mobile){
        return ctx.body = {
            code: 2,
            msg: '手机号不匹配',
        };
    }

    //判断验证码是否正确
    if(parseInt(vCode) !== globalObj.random){
        return ctx.body = {
            code: 3,
            msg: '验证码错误',
        }
    }

    //查询用户是否存在，不存在给他创建一个
    await User.findOne({mobile}).then((data)=>{
        if(data){
            return Promise.resolve(data);
        }else{
            new User({mobile}).save().then((data)=>{
                return Promise.resolve(data);
            })
        }
    }).then((data)=>{
        ctx.cookies.set('userId', data._id);
        return ctx.body = {
            code: 0,
            msg: '登录成功',
            data: data.mobile
        }
    }).catch((err)=>{
        return ctx.body = {
            code: 1,
            msg: '登录失败',
            data: err
        }
    });
});



/*
 * 查询是否登录
 * @param: mobile
 * @returns: {}
 */
router.get('/isLogin', async (ctx) => {
    const userId = ctx.cookies.get('userId');
    await User.findById(userId).then((data)=>{
        if(data){
            console.log(data);
            return ctx.body = {
                code: 0,
                msg: '已登录'
            }
        }else{
            return ctx.body = {
                code: 1,
                msg: '未登录'
            }
        }
    }).catch((err)=>{
        console.error('查询出错：', err)
    })
});


// 获取用户信息
router.get('/info', async ctx => {
    const userId = ctx.cookies.get('userId');
    await User.findById(userId, {__v: 0, collect: 0}).then((data)=>{
        if(data){
            return ctx.body = {
                code: 0,
                msg: '已登录',
                data
            }
        }else{
            return ctx.body = {
                code: 1,
                msg: '未登录,请先登录'
            }
        }
    }).catch((err)=>{
        console.error('查询出错：', err)
    })
});

// 获取用户收藏
router.get('/collect', async ctx => {
    const userId = ctx.cookies.get('userId');
    await User.findById(userId, {__v: 0}).then((data)=>{
        if(data){
            return ctx.body = {
                code: 0,
                msg: '获取成功',
                data: data.collect
            }
        }else{
            return ctx.body = {
                code: 1,
                msg: '获取失败'
            }
        }
    }).catch((err)=>{
        console.error('查询出错：', err)
    })
});

// 删除用户收藏
router.delete('/collect', async ctx => {
    const delArr = ctx.query;
    console.log(delArr)
    const userId = ctx.cookies.get('userId');
    await User.findById(userId, {__v: 0}).then((data)=>{
        if(data){
            return ctx.body = {
                code: 0,
                msg: '获取成功',
                data: data.collect
            }
        }else{
            return ctx.body = {
                code: 1,
                msg: '获取失败'
            }
        }
    }).catch((err)=>{
        console.error('查询出错：', err)
    })
});



module.exports = router.routes();
