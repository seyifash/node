const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {v4: uuidv4} = require('uuid')


const ordersSchema = new Schema({
    orderId: { type: String, default: uuidv4 },
    productId: { type: String, ref: 'Product', required: true },
    productName: { type: String, required: true },
    productWeight: { type: String },
    productPrice: { type: Number, required: true },
    orderQty: { type: Number, required: true },
    dateOrdered: { type: Date, default: Date.now },
    totalOrder: { type: Number, default: function() { return this.productPrice * orderQty; } }
})

const userSchema = new Schema({
    dateCreated: {type: Date, default: Date.now},
    userId: {type: String, default: uuidv4},
    firstName: {type: String, required: true},
    lastName : {type: String, required: true,},
    email: { type: String , required: true},
    password: {type: String, required: true},
    orders: [ordersSchema],
    totalQty: {type: Number},
    totalPrice: {type: Number},
    refreshToken: {type: String}
})


const User = mongoose.model('Users', userSchema);
module.exports = User