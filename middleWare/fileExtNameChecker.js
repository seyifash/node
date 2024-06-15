const path = require('path');

const fileExtChecker = (allowedExt) => {

    return (req, res, next) => {
        const files = req.files.files;
        
        const fileExt = [];
        files.forEach(file => {
            fileExt.push(path.extname(file.name))
        })
        console.log('files:' ,fileExt)
        const allowed = fileExt.every(ext => allowedExt.includes(ext));
        const message = `Upload failed. only ${allowedExt.toString()} files are allowed.`.replaceAll(",", ", ")
        if(!allowed){
            res.status(422).json({status: "error", message})
        }
        next();
    }
}

module.exports = fileExtChecker;