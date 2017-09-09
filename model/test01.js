/**
 * Created by RX-Wang on 2017/9/7.
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const schema = new Schema({
    name : String,
    patient : Array
});

module.exports = mongoose.model('test01',schema);