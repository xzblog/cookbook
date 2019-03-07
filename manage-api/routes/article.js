/*
 *  文章相关路由文件
 *  @Author: Miracle
 */

const router = require('koa-router')();
const Article = require('../model/article');
const Admin = require('../model/admin');

// 添加
router.post('/', async (ctx) =>　{
  const data = ctx.request.body;
  const token = ctx.cookies.get('token');

  // 得到用户名
  const author = await Admin.findById(token).then(data => {
      return data.username
  })
  await new Article({ ...data, author }).save().then( data => {
    ctx.body = {
      code: 0,
      msg: '添加成功',
      data: data
    }
  }).catch( err => {
    console.log(err);
  });
});


// 删除
router.del('/:id', async (ctx) => {
  const {id} = ctx.params;
  await Article.findByIdAndRemove(id).then( data => {
    ctx.body = {
      code: 0,
      msg: '删除成功',
      data: data
    }
  }).catch( err => {
    console.log(err);
  });
});

//修改
router.put('/:id', async (ctx) => {
  const {id} = ctx.params;
  const data = ctx.request.body;
  await Article.findByIdAndUpdate(id, data, {new: true}).then( data => {
    ctx.body = {
      code: 0,
      msg: '修改成功',
      data: data
    }
  }).catch( err => {
    console.log(err);
  });
});

// 查询
router.get('/', async (ctx) => {
    const { size = 10, type, author, title, beginTime, endTime } = ctx.query;
    let { page = 1 } = ctx.query;
    const options = {};

    if(type){
        options.type = type;
    }
    if(author){
        options.author = author;
    }
    if(title){
        options.title = new RegExp(title,'i');  // 变成正则，用于模糊查询
    }
    if(beginTime){
        options.createTime = {$lt: endTime || new Date(), $gte: beginTime};
    }
    if(!beginTime && endTime){
        options.createTime = {$lt: endTime};
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

module.exports = router.routes();
