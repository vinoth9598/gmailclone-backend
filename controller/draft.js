const Draft = require('../model/draft');
const User = require('../model/user');
const draftRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const config = require('../utils/config');


const getTokenFrom = (request) =>{
    let authorization = request.get("Authorization");
    
     if(authorization && authorization.toLowerCase().startsWith('bearer')){
            return authorization.substring(7);
        }
    return null;
}

draftRouter.post('/',async(request,response)=>{
    let {to,subject,message} = request.body ;

    const token = getTokenFrom(request);

    const decodedToken = jwt.verify(token,config.SECRET);

    if(!token || !decodedToken.id){
        return response.status(401).json({
            message:" token missing or invalid"
        });
    }

    const user = await User.findById(decodedToken.id);

    const draft = new Draft({
        to:to,
        subject:subject,
        message:message
    })

    let savedDraft = await draft.save();

    user.draft = user.draft.concat(savedDraft._id);

    await user.save();

    response.status(200).json({message:"draft mail is saved ",draft:savedDraft});

});

draftRouter.get('/',async(request,response)=>{
    let token = getTokenFrom(request);

    let decodedToken = jwt.verify(token,config.SECRET);

    if(!token || !decodedToken.id){
        return response.status(401).json({
            message:"token missing or invalid"
        })
    }

    let user = await User.findById(decodedToken.id).populate('draft',{
        to:1,
        subject:1,
        message:1,
        createAt:1
    });

    response.json(user.draft);

})

module.exports = draftRouter ;
