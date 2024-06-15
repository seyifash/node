const logEvent = require('./files/logEvents')

const EventEmitter = require('events');

class MyEmitter extends EventEmitter {};

const myEmitter = new MyEmitter();

//add listener for the log event
myEmitter.on('log', (msg) => logEvent(msg));

setTimeout(() => {
    myEmitter.emit('log', 'log event emitted')
}, 2000);