/*
 * 菜谱相关路由文件
 *  @Author: Miracle
 */

const router = require('koa-router')();
const CookbookArticle = require('../model/article');
const CookbookClassify = require('../model/classify');
const Admin = require('../model/admin');
const {upToQiNiu} = require('../component/qiniu/index');



router.get('/', async (ctx)=>{
    ctx.body = {
        code: 0,
        data: '菜谱相关路由'
    }
});



// 添加分类
router.post('/classify', async (ctx)=>{
    const data = ctx.request.body;
    await new CookbookClassify(data).save().then( data => {
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
router.del('/classify/:id', async (ctx)=>{
    const {id} = ctx.params;
    await CookbookClassify.findByIdAndRemove({_id: id}).then( data => {
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
router.put('/classify/:id', async (ctx)=>{
    const data = ctx.request.body;
    const {id} = ctx.params;
    await CookbookClassify.findByIdAndUpdate(id, data).then( data => {
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
router.get('/classify', async (ctx)=>{
    await CookbookClassify.find().sort({'order':1}).then( data => {
        ctx.body = {
            code: 0,
            msg: '查询成功',
            data: data
        }
    }).catch( err =>{
        console.log(err)
    })
});







//添加文章
router.post('/addArticle', async (ctx)=>{
    const data = ctx.request.body;
    // 得到图片
    const pic = data.pic;
    // 生成随机文件名称
    const key = Math.random().toString(16).substr(2);
    // 得到上传之后的返回值
    const qiNiu = await upToQiNiu(pic, key);
    // 生成链接
    const qiNiuUrl = 'http://p9sujruip.bkt.clouddn.com/'+ qiNiu.key;
    // 合并已有数据并存到数据库
    const newData = Object.assign(data, {pic: qiNiuUrl});
    console.log(newData);
    await new CookbookArticle(newData).save().then( data => {
        ctx.body = {
            code: 0,
            msg: '添加成功',
            data: data
        }
    }).catch( err =>{
        console.log(err)
    })
});

//获取具体文章
router.get('/getArticle/:id', async (ctx)=>{
    const {id} = ctx.params;
    await CookbookArticle.findById(id).then( data => {
        ctx.body = {
            code: 0,
            msg: '获取成功',
            data: data
        }
    }).catch( err =>{
        console.log(err)
    })
});

//文件上传
router.get('/upload', async (ctx)=> {
    // upToQiNiu('dsadasdasdasdsad','xx.png');
    await upToQiNiu('dsadasdasdasdsad','xx.png').then(res=> {
        ctx.body = {
           code: 0,
           msg: '上传成功',
           data: res
        }
    }).catch(err=> {
        console.log(err);
    })
});

//修改文章
router.post('/updateArticle', async (ctx)=>{
    const data = ctx.request.body;
    const id = data._id;
    await CookbookArticle.findByIdAndUpdate(id, data).then( data => {
        ctx.body = {
            code: 0,
            msg: '修改成功',
            data: data
        }
    }).catch( err =>{
        console.log(err)
    })
});

//删除文章
router.get('/removeArticle', async (ctx)=>{
    const {id} = ctx.query;
    await CookbookArticle.findByIdAndRemove(id).then( data => {
        ctx.body = {
            code: 0,
            msg: '删除成功',
            data: data
        }
    }).catch( err =>{
        console.log(err)
    })
});



//文章列表多条件筛选
router.get('/filter', async (ctx) =>{
    //查询条件options
    // 1. type: 分类
    // 2. author: 作者
    // 3. beginTime: 开始时间
    // 4. endTime: 结束时间
    // 5. title: 标题（需要模糊查询）

    // 分页查询
    //1. page: 当前页数
    //2. limit: 每页显示数量
    //3. skip: 跳过几条 => (page - 1) * limit
    //4. pages: 总的页数 => 总的条数 / 每页显示数量 并向上取整

    const {type, title, author, beginTime, endTime} = ctx.query;
    let page = Number(ctx.query.page || 1),
        limit = Number(ctx.query.limit || 1),
        pages = 0,
        skip = 0,
        total = 0;
    const name = new RegExp(title,'i');  // 变成正则，用于模糊查询
    let options = {}; //查询条件
    if(type){
        options.type = type;
    }
    if(author){
        options.author = author;
    }
    if(title){
        options.title = name;
    }
    if(beginTime){
        options.createTime = {$lt: endTime || new Date(), $gte: beginTime};
    }
    if(!beginTime && endTime){
        options.createTime = {$lt: endTime};
    }
    console.log(options);
    //查询数据库符合条件的数据数量
    await CookbookArticle.count(options).then((count) =>{
        pages = Math.ceil(count / limit);  //向上取整

        total = count;

        //页数最低不能低于1
        page = Math.max(page,1);

        // 最高不能高于总页数
        page = Math.min(page, pages);

        skip = (page - 1) * limit ;
    });

    await CookbookArticle.find( options, {__v: 0, content: 0}, {limit, skip}).then((data)=>{
        ctx.body = {
            code: 0,
            msg: '查询成功',
            data: {
                result: data,
                total: total
            }
        }
    });
});

//获取作者
router.get('/getAuthor', async (ctx)=>{
    const {query} = ctx.query;
    const author = new RegExp(query, 'i');
    await Admin.find({userName: author}).then( data => {
        console.log(data);
        if(data){
            ctx.body = {
                code: 0,
                msg: '获取成功',
                data: data
            }
        }else{

            ctx.body = {
                code: 1,
                msg: '没有相关作者',
                data: data
            }
        }
    }).catch( err =>{
        console.log(err)
    })
});



module.exports = router.routes();