const Product = require('../models/product');
const fs = require('fs');
const fsPromise = require('fs').promises;
const path = require('path');


const createProduct = async (req, res) => {

    const { productName, productBrand, productPrice, productWeight} = req.body;
    if(!productName || !productBrand || !productPrice || !productWeight){
        res.status(400).json({status: 'error', message: "All fields are required"})
    }

    let files = req.files.files;

    if(!files || files.length === 0) {
        return res.json({status: error, message: "missing images"})
    }
    if(!fs.existsSync(path.join(__dirname, '..', 'imagesFolder'))) {
       await  fsPromise.mkdir(path.join(__dirname, '..', 'imagesFolder'))
    }

    try{
        let imageList = [];
        files.map(async (file) => { 
            const  filePath = path.join(__dirname, '..', 'imagesFolder', file.name);
            imageList.push(file.name)
             await file.mv(filePath)
    });

    const newProduct = await Product.create({
        productName: productName,
        productBrand: productBrand,
        productPrice: productPrice,
        productWeight: productWeight,
        productImage: imageList
    });

    console.log(newProduct)
    res.status(201).json({ status: 'success', message: 'Product created successfully'});
    }catch(err){
        console.log(err.message)
        res.status(500).json({ status: 'error', message: err.message })
    }
}

module.exports = { createProduct}