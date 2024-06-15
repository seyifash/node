const Mb = 5;
const fileLimit = Mb * 1024 * 1024;

const fileSizeLimit = (req, res, next) => {
    const files = req.files.files;
    //console.log(files)
    if(!files){
        return res.json({ status: "error", message: 'No files'})
    }

    const fileExceedFileLimit = []
    files.forEach(file => {
        if(file.size > fileLimit) {
            fileExceedFileLimit.push(file)
        }
    });
    if(fileExceedFileLimit.length > 0){

        const proVerb = fileExceedFileLimit.length > 2 ? 'are' : 'is';

        const sentence = `Upload fail. ${fileExceedFileLimit.toString()} ${proVerb} are over the size limit of ${Mb}mb`.replaceAll(",", ", ")
        
        const message = fileExceedFileLimit < 3 
            ? sentence.replace(",", " and") 
            : sentence.replace(/,(?=[^,]*$)/, " and");

        res.status(400).json({message: message})
    }
    next();
}

module.exports = fileSizeLimit;