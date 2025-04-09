const dashboardRouter = require('express').Router();

dashboardRouter.get('/',(request,response)=>[
    
    response.send(`
        <div>
            <h1>Welcome to gmailClone </h1>
            <p>Data are stored in mongodb to user details and login authentication </p>
        
        </div>`)
])

module.exports = dashboardRouter;