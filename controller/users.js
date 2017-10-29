/**
 * Created by wangxuquan on 2017/5/4.
 */
const send          = require('koa-send');
const sendfile      = require('koa-sendfile');
const Promise       = require('bluebird');
const userModel     = require('../model/user');
const test01Model   = require('../model/test01');
const test02Model   = require('../model/test02');
const test03Model   = require('../model/test03');
const dao           = require('../dao');
const fs            = require('fs');
const path          = require('path');
const config        = require('../config');
const Users         = {};

Users.index = (ctx)=>{
    // console.log('users-----');
    //throw new Error('Error!!');
    ctx.body = 'users';
};

Users.login = (ctx)=>{
  ctx.body = 'users/login'
};

/**
 * 注册页面
 */
Users.register =async (ctx)=>{
    await ctx.render('/register');
};

/**
 * 保存用户信息
 */
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
        if(typeof result === 'string'){
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
    console.log(`p---${p}`);
    //取文件名
    const start = p.lastIndexOf('/');
    console.log(`start:${start}`);
    const filename = p.substring(~~start+1);
    console.log(`文件名称---${filename}`);

    //取真实文件路径
    const filepath = path.join(__dirname,'../public/',p);
    console.log(`文件路径---${filepath}` );
    ctx.body = {
        downloadPath : p
    };
};

/**
 * redis 设置某个值
 * @param ctx
 */
Users.redisSet = async (ctx) =>{
// listen for redis connection error event
    config.redisCache.store.events.on('redisError', function(error) {
        // handle error here
        console.log('redis===报错了%j' , error);
    });
    try{
        const resu = await new Promise(function (reso,rej) {
            config.redisCache.set('myLove', "Diana", { ttl: 20 }, function(err) {
                if (err) {
                    rej(err);
                }else {
                    reso('设置成功');
                }
            });
        });
        return ctx.body = resu;
    }catch(e){
        return ctx.body = e;
    }


};


/**
 * redis 获取某个值
 * @param ctx
 */
Users.redisGet = async (ctx) =>{
    const resu = await new Promise(function (reso,rej) {
        config.redisCache.get('myLove', function(err, result) {
            console.log(result);
            // redisCache.del('foo', function(err) {});
            reso(result);
        });
    });
    return ctx.body = resu || '没有';
};

Users.user_socket = async(ctx)=>{
  await ctx.render('socket');
};

Users.saveForFor = async(ctx) =>{
    for(let i = 1; i <= 4; i++){
        const saved = await new Promise(function (reso,rej) {
            dao.save(test01Model,{name : `用户:${i}`},function (err,saved01) {
                if(err)
                    return rej(err);
                reso(saved01);
            });
        }).then(function (saved01) {
            for(let j = 1; j <= 4; j++){
                dao.save(test02Model,{
                    uid     : saved01._id,
                    patient : `用户:${i}--患者:${j}`
                },function (err,saved02) {
                    if(err)
                        return console.log(err.message);
                    else{
                        for(let k = 1; k <=4; k++){
                            dao.save(test03Model,{
                                patientId   : saved02._id,
                                medicalCard :  `用户:${i}--患者:${j}--就诊卡:${k}`
                            },function (err,saved03) {
                                if(err)
                                    console.log(err.message);
                                else
                                    console.log(saved03);
                                if(k == 4)
                                    return Promise.resolve();
                            })
                        }
                    }
                })
            }
        }).catch(function (err) {
            console.log(err.message);
        });
        if(i == 4)
            return ctx.body = 'SUCCESS';
    }
};

Users.findUserForFor = async(ctx)=>{
    try{
        const users = await new Promise(function (reso,rej) {
            dao.find(test01Model,{},function (err,users) {
                //users && users.length && console.log(users);
                if(err)
                    return rej(err);
                reso(users);
            })
        });
        const u3 = await new Promise(function (reso1,rej1) {
            async function doSth(count) {
                const patients = await new Promise(function (reso,rej) {
                    dao.find(test02Model,{uid : users[count] ? users[count]._id : '123'},function (err,patients) {
                        reso(patients);
                    })
                }).catch(function (err) {
                    rej1(err);
                });
                const u2 = await new Promise(function (resolve,reject) {
                    async function doSth01(num){
                        const u1 = await new Promise(function (reso,rej) {
                            dao.find(test03Model,{patientId : patients[num]._id},function (err,medicalCard) {
                                patients[num]._doc.medicalCard = medicalCard;
                                num++;
                                if(num < 4)
                                    return doSth01(num);
                                else{
                                    users[count].patient = patients;
                                    count++;
                                    if(count < 4)
                                        return doSth(count);
                                    else{
                                        //console.log(users);
                                        //return ctx.body = users;
                                        reso(users);
                                    }
                                }
                            })
                        });
                        if(num == 4)
                            return resolve(u1);
                    }
                    doSth01(0);
                });
                if(count == 4)
                    reso1(u2);
            }
            doSth(0);
        });
        return ctx.body = u3;
    }catch (e){
        console.log(e);
        return ctx.body = {
            errMsg : e.message
        }
    }

    /*new Promise(function (reso,rej) {
        dao.find(test01Model,{},function (err,users) {
            if(err)
                return rej(err);
            reso(users);
        })
    }).then(function (users) {
        function doSth(count) {
            new Promise(function (reso,rej) {
                dao.find(test02Model,{uid : users[count]._id},function (err,patients) {
                    reso(patients);
                })
            }).then(function (patients) {
                function doSth01(num){
                    return new Promise(function (reso,rej) {
                        dao.find(test03Model,{patientId : patients[num]._id},function (err,medicalCard) {
                            patients[num]._doc.medicalCard = medicalCard;
                            num++;
                            if(num < 4)
                                return doSth01(num);
                            else{
                                users[count].patient = patients;
                                count++;
                                if(count < 4)
                                    return doSth(count);
                                else{
                                    console.log(users);
                                    //return ctx.body = users;
                                    return users;
                                }
                            }
                        })
                    });
                }
                doSth01(0);
            });
        }
        doSth(0);
    }).catch(function (err) {
        console.log(err.message);
    });*/

};

Users.readHtmlFile = async(ctx)=>{
    console.log(ctx.request.accept.headers.accept);
    ctx.response.type = 'html';
    ctx.response.body = fs.readFileSync(path.join(__dirname,'../views/readHtmlFile.html'));
};

module.exports = Users;
