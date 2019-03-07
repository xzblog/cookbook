const router = require('koa-router')({prefix: "/api/v1.0.0"});

const cookbook = require('./routes/cookbook');
const article = require('./routes/article');
const classify = require('./routes/classify');
const common = require('./routes/common');
const admin = require('./routes/admin');


router.use('/classify', classify);   // 菜谱分类
router.use('/article', article);     // 文章
router.use('/cookbook', cookbook);   // 菜谱相关
router.use('/common', common);       // 公用
router.use('/admin', admin);         // 管理员



module.exports = router.routes();
