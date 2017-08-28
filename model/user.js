/**
 * Created by wangxuquan on 2017/5/8.
 */
const config = require('../config');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const schema = new Schema({
    name : String,
    pwd  : String,
    created_at : {type : Date, default: Date.now}
});

module.exports = mongoose.model('user',schema);

