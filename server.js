require('dotenv').config();
const express = require('express')
const app = express()
const path = require('path')
const cors = require('cors');
const corsOptions = require('./config/corsOptions')
const { logger} = require('./middleWare/logEvents');
const errorLogger = require('./middleWare/errorLog');
const verifyJWT = require('./middleWare/verifyJWT')
const cookieParser = require('cookie-parser');
const credentials = require('./middleWare/credentials');
const fileUpload = require('express-fileupload');
const mongoose = require('mongoose');
const connectDB = require('./config/dbConn')
// define port
const PORT = process.env.PORT || 3500;

// Connect to mongo db
connectDB();

// lo even in  a file
app.use(logger)

// handle options credentials check - before CORS! and fetch cookies and credentials requirement
app.use(credentials);

// cross origin resource sharing
app.use(cors(corsOptions))

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({extended: false}))

// built-in middleware for json
app.use(express.json());

app.use(fileUpload({
    createParentPath: true
}))

//middleware for cookie parser
app.use(cookieParser())

app.use('/register', require('./routes/api/register'));
app.use('/auth', require('./routes/api/auth'));
app.use('/refresh', require('./routes/api/refresh'));
app.use('/logout', require('./routes/api/logout'));
app.use('/product', require('./routes/api/product'))

app.use(verifyJWT);
app.use('/newOrder', require('./routes/api/orders'));

app.use(errorLogger);

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDb');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})


