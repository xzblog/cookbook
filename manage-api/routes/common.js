/*
 * 公用接口
 * @Author: Magical
 * @Date: 2018/8/29 0029
 */
const router = require('koa-router')();

const {getToken} = require('../component/qiniu/index');


// 获取七牛上传token
router.get('/getToken', async (ctx)=>{
    const token = await getToken();
    ctx.body = {
        code: 0,
        data: token
    }
});


module.exports = router.routes();