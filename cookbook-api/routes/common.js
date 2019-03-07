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

// 热门搜索
router.get('/hotSearch', async (ctx) =>{
    //根据用户的搜索记录，得出搜索次数最多的几位。
    // 此处伪造
    ctx.body = {
        code: 0,
        msg: '查询成功',
        data: ['牛排', '糖醋里脊', '馄炖','五花肉', '大闸蟹','辣子鸡']
    }
});



module.exports = router.routes();
