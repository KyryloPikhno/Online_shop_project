const router = require('express').Router();

const {orderController} = require("../controllers");


router.get('/', orderController.getAll);

router.get('/count', orderController.getCount);

router.get('/:orderId', orderController.getById);

router.get('/user_orders/:userId', orderController.getUserOrders);

router.post('/', orderController.create);

router.put('/:orderId', orderController.update);

router.delete('/:orderId', orderController.delete);

module.exports = router;