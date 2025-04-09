const config = require('../utils/config');
const jwt = require('jsonwebtoken');
const emailRouter = require('express').Router();
const Email = require('../model/email');
const User = require('../model/user');

const getTokenFrom = (request)=>{
    const authorization = request.get('Authorization');

    if(authorization && authorization.toLowerCase().startsWith('bearer')){
        return authorization.substring(7);
    }
    return null;
}

emailRouter.post('/',async(request,response)=>{
    const {to,subject,message} = request.body;

    const token = getTokenFrom(request);

    const decodedToken = jwt.verify(token,config.SECRET);

    if(!token || !decodedToken.id){
        return response.status(401).json({
            message:"token missing or invalid"
        });
    }

    const user = await User.findById(decodedToken.id);

    const email = new Email({
        to:to,
        subject:subject,
        message:message
    });

    const savedEmail = await email.save();

    user.email = user.email.concat(savedEmail._id);

    await user.save();

    response.json({message:"Note saved successfully",email:savedEmail});
})


emailRouter.get('/',async(request,response)=>{
    const token = getTokenFrom(request);

    const decodedToken = jwt.verify(token,config.SECRET);

    if(!token || !decodedToken.id){
        return response.status(401).json({
            message:"Token missing or invalid"
        });
    }

    const user = await User.findById(decodedToken.id).populate("email",{
        to:1,
        subject:1,
        message:1,
        createAt:1,
        important:1
    });

    response.json(user.email);
});

emailRouter.put('/update/:id', async(request,response)=>{

    let id = request.params.id ;

    const { isImportant } = request.body ;

    let email = await Email.findByIdAndUpdate({_id:id}).updateOne({important:isImportant})

    if(email){
        response.status(201).json(email);
    }else{
        response.status(401).json("email is updated failed..");
    }

});

emailRouter.delete('/delete/:id',async(request,response)=>{

    let id = request.params.id ;

    let email = await Email.findByIdAndDelete({_id:id})

    response.status(200).json(email);
  
})


module.exports = emailRouter;