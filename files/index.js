const fs = require('fs');
const path = require('path');

fs.readFile(path.join(__dirname, 'files', 'starter.txt'), 'utf8', (err, data) => {
    if(err) throw err;
    console.log(data);
})
 console.log('hello Jesus');

process.on('uncaughtException', err => {
    console.error(`There was an uncaught error : ${err}`);
    process.exit(1)
})

fs.writeFile(path.join(__dirname, 'files', 'reply.txt'), 'Nice to meet you.', (err) => {
    if (err) throw err;
    console.log('write complete')
})

fs.appendFile(path.join(__dirname, 'files', 'reply.txt'), '\n\nYes it is', (err) => {
    if (err) throw err;
    console.log('Append complete')
})