/**
 * Created by wangxuquan on 2017/5/4.
 */
const Router = require('koa-router');
const router = new Router();
const indexController = require('../controller/index');
router.get('/', indexController.index);

module.exports = router;