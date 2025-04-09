const mongoose = require('mongoose');


const draftSchema = new mongoose.Schema({
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
    }
})

const Draft = mongoose.model('Draft',draftSchema,'draft');

module.exports = Draft ;