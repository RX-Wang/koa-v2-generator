/**
 * Created by wangxuquan on 2017/5/4.
 */
const Router = require('koa-router');
const router = new Router({
    prefix : '/users'           //配置公共子路由
});
const userController = require('../controller/users');

function middle(ctx,next){
    console.log('users---middleware');
    next();
}
/**
 * 配置请求中间件，凡是在中括号中的路由都需要经过中间件。
 */
router.use(['/login'],middle);




router.get('/',userController.index);
router.get('/login',userController.login);
router.get('/register',userController.register);
router.post('/sign-up',userController.signUp);
router.get('/html',userController.html);
router.post('/download',userController.download);
router.get('/redisSet',userController.redisSet);
router.get('/redisGet',userController.redisGet);
router.get('/socket',userController.user_socket);



module.exports = router;

