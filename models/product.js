const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {v4: uuidv4} = require('uuid');

const productSchema = new Schema({
    productName: {type: String},
    productBrand: {type: String},
    productId: {type: String, default: uuidv4},
    productPrice: {type: Number},
    productWeight: {type: String},
    productImage: {type: Array}
})

const Product = mongoose.model('product', productSchema);

module.exports = Product;
