const User = require('../models/users');

const newOrder = async (req, res) => {
    const { userId, order} = req.body;

    if(!userId || !order) {
        res.status(400).json({status: 'error', message: 'userId and order required'})
    }

    const user = await User.findOne({ userId }).exec();
    if(!user){
        res.json(204)
    }

    try{
    order.map(order => {
        user.orders.push({
            productId: order.productId,
            productName: order.productName,
            productWeight: order.productWeight,
            productPrice: order.productPrice,
            orderQty: order.orderQty,
        });
    });

    user.totalQty = user.orders.reduce((acc, order) => acc + order.orderQty, 0);
    user.totalPrice = user.orders.reduce((acc, order) => acc +  order.totalOrder, 0)

    const newOrder = await user.save();
    console.log(newOrder)

    res.status(200).json({status: 'success', message: 'users order created successfully'})
    } catch(err){
        res.status(500).json({status: "error", message: err.message})
    }
}

module.exports = { newOrder }