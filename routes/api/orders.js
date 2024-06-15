const express = require('express');
const router = express.Router();
const orderController = require('../../controller/orderController');


router.post('/', orderController.newOrder)

module.exports = router