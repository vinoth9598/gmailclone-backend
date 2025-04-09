const User = require('../model/user');
const loginRouter = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../utils/config');

loginRouter.post('/',async(request,response)=>{
    const {username,password} = request.body;

    const user = await User.findOne({username});

    if(!user){
        return response.status(401).json({
            message:"user not exist"
            
        });
    }

    const isAuthenticated = await bcrypt.compare(password,user.passwordHash);

    if(!isAuthenticated){
        return response.status(401).json({
            message:"please enter correct password"
            
        });
    }
    const payload = {
        username : user.username,
        id:user._id
    }

    const token = jwt.sign(payload,config.SECRET);

    response.status(200).json({
        token,username:user.username,name:user.name
    })
})

module.exports = loginRouter;


