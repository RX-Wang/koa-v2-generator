>此为 KOA 2.2.0 版本，需要 node版本在 7.9.0之上，支持ES6,不需要babel

## 一、路由

>如：localhost:3000/users/getName、  localhost:3000/users/getSex

### 1、配置公用子路由

  公共子路由 为：  users，可以简略配置：
  
```
    const Router = require('koa-router');
    const router = new Router({
        prefix : '/users'          //配置公共子路由 
    });

```

### 2、配置公用中间件

上面两个路由，需要先验证用户的登录状态，此时我们需要用中间件，可简单配置：

```
function middle(ctx,next){
    console.log('users---middleware');
    next();
}
router.use(['/getName','/getSex'],middle);
```

>该配置需写在路由文件：users.js 中所有路由之上。


###  一、koa-router
 ```
##  app.js
const users     = require('./routers/users');  //这里跟express 差不多。
app.use(users.routes())

##  routers/users.js
const Router = require('koa-router');
const router = new Router({
    prefix : '/users'           //配置 公共子路由
});
const userController = require('../controller/users');

function middle(ctx,next){
    console.log('users---middleware');
    next();
}
/**
 * 配置请求中间件，凡是在中括号中的路由都需要经过中间件:middle。
 */
router.use(['/login'],middle);
router.get('/',userController.index);
router.get('/login',userController.login);
router.all('/sign-up',userController.signUp);
```
###  二、koa-bodyparser

> 获取post数据

```
## app.js
const bodyPaser = require('koa-bodyparser');
app.use(bodyPaser());
## controller.js
const uname =  req.body.uname;
const password =req.body.password;

```
###  三、koa-static

>配置静态文件路径

```
const __static  = require('koa-static');
app.use(__static(__dirname + '/public'));

```
###  四、koa-ejs
>配置ejs视图模板


```
##  app.js 中配置

const Koa       = require('koa');
const app       = new Koa();
const ke        = require('koa-ejs');

ke(app, {
    root: path.join(__dirname, 'view'),
    layout: 'index',    //根视图
    viewExt: 'html',
    cache: false,
    debug: true
});

##  cnotroller.js  中渲染视图
Users.html = async (ctx,next)=>{
    await ctx.render('img',{data:'李若彤'});    //将img.html渲染到index.html 根视图中。
    // return next().then(() => {
    //     ctx.render('index',{data:'李若彤'});
    // });
};

##  index.html

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
    <%- body%>
</body>
</html>

## img.html

<h1>哈哈</h1>
<img src="/image/李若彤.jpg" title="<%=data%>">
<p><%=data%></p>
```




