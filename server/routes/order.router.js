const router = require('express').Router();

const {orderController} = require("../controllers");


router.get('/', orderController.getAll);

router.get('/:orderId', orderController.getById);

router.get('/totalSales', orderController.getTotalSales);

router.get('/count', orderController.getCount);

router.get('/:userId', orderController.getUserOrders);

router.post('/', orderController.create);

router.put('/', orderController.update);

router.delete('/', orderController.delete);

module.exports = router;