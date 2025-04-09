const mongoose = require('mongoose');

const emailSchema = new mongoose.Schema({
    to:String,
    subject:String,
    message:String,
    createAt:{
        type:Date,
        default:Date.now
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    important:{
        type:Boolean,
        default:false
    }
})

const Email = mongoose.model('Email',emailSchema,'email');

module.exports = Email;