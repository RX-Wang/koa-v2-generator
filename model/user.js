/**
 * Created by wangxuquan on 2017/5/8.
 */
const config = require('../config');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.Promise = global.Promise;
mongoose.connect(config.connection(),function (err,data) {
    if(err)
        console.error('链接失败：%s',err.message);
    else
        console.info('链接成功：%s',config.connection());
});

const schema = new Schema({
    name : String,
    pwd  : String,
    created_at : {type : Date, default: Date.now}
});

module.exports = mongoose.model('user',schema);

