
const allowedOrigins = require('./allowedOrigins')
// we create an options for cors what checks if the domain making  request to our api is in the whitelist, if not we send an error
const corsOptions = {
    //define an anonymous function that takes in the origin and the call back
    origin: (origin, callback) => {
        // we then check if origin making request is in 
        if(allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not Allowed by CORS'))
        }
    },
    optionsSuccessStatus: 200
}

module.exports = corsOptions