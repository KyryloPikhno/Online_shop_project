const router = require('express').Router();

const {orderController} = require("../controllers");
const {orderMiddleware, authMiddleware} = require("../middlewares");


router.get('/',
    authMiddleware.checkAssessToken,
    orderMiddleware.checkIsOrdersExist,
    orderController.getAll);

router.get('/count',
    authMiddleware.checkAssessToken,
    orderController.getCount
);

router.get('/:orderId',
    authMiddleware.checkAssessToken,
    orderMiddleware.checkIsOrderExistsById,
    orderController.getById
);

router.get(
    '/user_orders/:userId',
    authMiddleware.checkAssessToken,
    orderMiddleware.checkIsUserOrdersExist,
    orderController.getUserOrders
);

router.post(
    '/',
    authMiddleware.checkAssessToken,
    orderMiddleware.checkIsBodyValid,
    orderController.create
);

router.put(
    '/:orderId',
    authMiddleware.checkAssessToken,
    orderMiddleware.checkIsOrderExistsForUpdate,
    orderController.update
);

router.delete(
    '/:orderId',
    authMiddleware.checkAssessToken,
    orderController.delete
);

module.exports = router;