const router = require('koa-router')({prefix: "/api/v1.0.0"});

const article = require('./routes/article');
const classify = require('./routes/classify');
const common = require('./routes/common');
const user = require('./routes/user');


router.use('/classify', classify);   // 菜谱分类
router.use('/article', article);     // 文章
router.use('/common', common);       // 公用
router.use('/user', user);           // 用户



module.exports = router.routes();
