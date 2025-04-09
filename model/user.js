const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username:String,
    name:String,
    passwordHash:String,
    email:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Email'
        }
    ],
    draft:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Draft'
        }
    ]
})

const User = mongoose.model('User',userSchema,'users');

module.exports = User;