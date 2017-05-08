/**
 * Created by wangxuquan on 2017/5/4.
 */
const send      = require('koa-send');
const sendfile  = require('koa-sendfile');
const Promise   = require('bluebird');
const userModel = require('../model/user');
const dao       = require('../dao');
const fs        = require('fs');
const path      = require('path');
const Users     = {};

Users.index = (ctx)=>{
    // console.log('users-----');
    //throw new Error('Error!!');
    ctx.body = 'users';
};

Users.login = (ctx)=>{
  ctx.body = 'users/login'
};

Users.register =async (ctx)=>{
    await ctx.render('/register');
};

Users.signUp = async (ctx)=>{
    const req   = ctx.request;
    const name  = req.query.name || req.body.name || '';
    const pwd   = req.query.pwd || req.body.pwd || '';
    if(!name || !pwd){
        ctx.body = {
            code : 'ERROR',
            msg  : '参数错误'
        };
    }else{
        const result = await new Promise(function (reso,rej) {
            dao.save(userModel,{
                name : name,
                pwd  : pwd
            },function (err,data) {
                if(err)
                    return reso(err.message);
                return reso(data);
            });
        });
        if(typeof result == 'string'){
            console.log(result);
            return ctx.body = {
                code : 'faild',
                msg  : '注册失败'
            };
        }else{
            return ctx.body = {
                code : '200',
                msg  : '注册成功'
            };
        }
    }
};

Users.html = async (ctx,next)=>{
    await ctx.render('img',{data:'李若彤'});     //将img.html渲染到index.html 根视图中。
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
