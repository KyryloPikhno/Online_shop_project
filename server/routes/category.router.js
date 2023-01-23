const router = require('express').Router();

const {categoryController} = require("../controllers");


router.get('/', categoryController.getAll);

router.post('/',  categoryController.create);

router.get('/:categoryId', categoryController.getById);

router.put('/:categoryId', categoryController.update);

router.delete('/:categoryId', categoryController.delete);

module.exports = router;