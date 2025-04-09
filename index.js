const app = require('./app');
const mongoose = require('mongoose');
const config = require('./utils/config');

mongoose.connect(config.MONGODB_URI)
    .then(()=>{
        console.log("database is connected...");
    })
    .catch((e)=>{
        console.log("database connecation failed..",e);
    })


app.listen(config.PORT,()=>{
    console.log(`server running at ${config.PORT}`);
});