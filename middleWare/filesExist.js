const fileExist = (req, res, next) => {
    const files = req.files.files;
    if(!req.files.files){
        return res.status(400).json({status: error, message: "At least one image is required"})
    }
    next();
}

module.exports = fileExist;