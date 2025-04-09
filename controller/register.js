const User = require ('../model/user');
const bcrypt = require('bcrypt');
const userRouter = require('express').Router();

userRouter.post('/',async (request,response)=>{
    const {username,name,password} = request.body;

    const passwordHash = await bcrypt.hash(password,10);

    const user = new User({
        username,
        name,
        passwordHash
    });

    const savedUser = await user.save();

    response.json(savedUser);
})

module.exports = userRouter;