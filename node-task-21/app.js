const express = require('express');
const config = require('./config/config');
const mongoose = require('mongoose');
const cors = require('cors');
const userRouter = require('./routes/userRoute')
const bookRouter = require('./routes/bookRoute')
const expenseRouter = require('./routes/expenseRoute')
const commentRouter = require('./routes/commentRoute')
const multer = require("multer");
const apiLogger = require('./common/apiLogger');


const app = express();
app.use(cors(
)); // origin cross 
app.use(express.json()); // accept json format payload
app.use(multer().any()); // file upload formdata
app.use(apiLogger); // for access log 


mongoose.connect(config.MONGODB_URL).then(() => {
    app.listen(config.PORT,'0.0.0.0' , () => {
        console.log(`Port running on ${config.PORT}`)
        console.log("DB connect ho gaya... Ab postman me jaake check karo...")
        app.use('/', userRouter);
        app.use('/book', bookRouter);
        app.use('/comment', commentRouter);
        app.use('/expense', expenseRouter);
    });
}).catch((error) => {
    console.log(error)
})


