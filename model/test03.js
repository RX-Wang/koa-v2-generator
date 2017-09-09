/**
 * Created by RX-Wang on 2017/9/7.
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const schema = new Schema({
    patientId : String,
    medicalCard : String
});

module.exports = mongoose.model('test03',schema);