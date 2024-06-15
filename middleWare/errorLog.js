const { logEvent } = require('./logEvents');

const errorLogger = (err, req, res, next) =>{
    logEvent(`${err.name}: ${err.message}`, 'errLog.txt')
    console.log(`${err.name}: ${err.message}`)

    res.status(500).send(err.message)
    next();
}

module.exports = errorLogger;