var express = require('express');
var router = express.Router();

const fruitController = require('../controllers/fruits.controller')

router.get('/', fruitController.getAllFruits)
router.post('/', fruitController.createFruit)
router.put('/:id', fruitController.editFruit)
router.delete('/:id', fruitController.deleteFruit)
router.get('/:id', fruitController.getDetailFruit)

module.exports = router;