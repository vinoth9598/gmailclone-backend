const express = require('express');
const app = express();
const loginRouter = require('./controller/login');
const cors = require('cors');
const emailRouter = require('./controller/emails');
const userRouter = require('./controller/register');
const draftRouter = require('./controller/draft');

// middleware 
app.use(express.json());
app.use(cors());

app.use('/register',userRouter);
app.use('/login',loginRouter);
app.use('/email',emailRouter);
app.use('/draft',draftRouter);



module.exports = app;