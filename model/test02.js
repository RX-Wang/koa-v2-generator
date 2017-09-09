/**
 * Created by RX-Wang on 2017/9/7.
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const schema = new Schema({
    uid : String,
    patient : String
});

module.exports = mongoose.model('test02',schema);