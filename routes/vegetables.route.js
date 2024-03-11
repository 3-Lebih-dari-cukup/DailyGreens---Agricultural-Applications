var express = require('express');
var router = express.Router();

const vegetableController = require('../controllers/vegetables.controller')

router.get('/', vegetableController.getAllVegetables)
router.post('/', vegetableController.createVegetable)
router.put('/:id', vegetableController.editVegetable)
router.delete('/:id', vegetableController.deleteVegetable)
router.get('/:id', vegetableController.getDetailVegetable)

module.exports = router;