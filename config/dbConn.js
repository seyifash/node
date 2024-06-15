const mongoose = require('mongoose');

const connectDB = async ()  => {
    try{
        await mongoose.connect(process.env.DATABASE_URI, {
            useNewUrlParser: true, 
            useUnifiedTopology: true,
        })
    }catch(err){
       console.log(error)
    }
}

module.exports = connectDB;