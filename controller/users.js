/**
 * Created by wangxuquan on 2017/5/4.
 */
const send      = require('koa-send');
const sendfile  = require('koa-sendfile');
const Promise   = require('bluebird');
const fs        = require('fs');
const path  = require('path');
const Users = {};

Users.index = (ctx)=>{
    // console.log('users-----');
    //throw new Error('Error!!');
    ctx.body = 'users';
};

Users.login = (ctx)=>{
  ctx.body = 'users/login'
};

Users.signUp = (ctx)=>{
    const req = ctx.request;
    const uname = req.query.uname || req.body.uname;
    const password = req.query.password || req.body.password;
    // console.log('uname:%s--password:%s',uname,password);
    if(!uname || !password){
        // ctx.response.status = 500;
        ctx.body = {
            code : 'ERROR',
            msg  : '参数错误'
        };
    }else{
        ctx.body = {
            code : 'success',
            msg  : '成功'
        };
    }
};

Users.html = async (ctx,next)=>{
    await ctx.render('img',{data:'李若彤'});     //将img.html渲染到index.html 根视图中。
    // return next().then(() => {
    //     ctx.render('index',{data:'李若彤'});
    // });
};

Users.download = async (ctx)=>{
    const req      = ctx.request;
    const  p       = req.query.fileName || req.body.fileName || 'unkonw';
    //取文件名
    const start = p.lastIndexOf('/');
    const filename = p.substring(~~start+1);
    console.log('文件名称---' + filename);

    //取真实文件路径
    const filepath = path.join(__dirname,'../public/',p);
    console.log('文件路径---' + filepath);
    ctx.body = {
        downloadPath : p
    };
};


module.exports = Users;
