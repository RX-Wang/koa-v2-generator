const Koa = require('koa');
const app = new Koa();
// const views = require('koa-views');
const ke        = require('koa-ejs');
const path      = require('path');

const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser')();
const logger = require('koa-logger');

const index = require('./routes/index');
const users = require('./routes/users');

// error handler
onerror(app);

// middlewares
app.use(bodyparser);
app.use(json());
app.use(logger());
app.use(require('koa-static')(__dirname + '/public'));

ke(app, {
    root: path.join(__dirname, 'views'),
    layout: 'index',             //根视图
    viewExt: 'html',
    cache: false,
    debug: true
});

/*app.use(views(__dirname + '/views', {
  extension: 'pug'
}));*/

// logger
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// routes
app.use(index.routes(), index.allowedMethods());
app.use(users.routes(), users.allowedMethods());

module.exports = app;
