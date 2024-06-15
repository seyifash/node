const express = require('express');
const router = express.Router();
const fileExist = require('../../middleWare/filesExist');
const fileExtChecker = require('../../middleWare/fileExtNameChecker');
const fileSizeLimit = require('../../middleWare/fileSizeLimiter');
const productController = require('../../controller/productController');

router.post('/',
    fileExist,
    fileExtChecker(['.png', '.jpeg', '.JPG', '.PNG', '.jpg']),
    fileSizeLimit,
    productController.createProduct
)  

module.exports = router;