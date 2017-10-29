/**
 * Created by wangxuquan on 2017/5/4.
 */
const send      = require('koa-send');
const path      = require('path');

const Index = {};

Index.index = async (ctx)=>{
    ctx.body = 'hello koa--'+ __dirname;
};

module.exports = Index;