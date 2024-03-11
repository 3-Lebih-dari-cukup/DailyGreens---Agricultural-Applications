
const fruitService = require('../services/fruits.service')
const { imageValidations } = require('../validations/image.validation')
const { validateAddFruit, validateEditFruit } = require('../validations/fruits.validation')

exports.getAllFruits = async (req, res) => {

  const result = await fruitService.getAllFruits(req, res)

  return res.status(result.status).json(result)
}

exports.getDetailFruit = async (req, res) => {

  const result = await fruitService.getDetailFruit(req, res)

  return res.status(result.status).json(result)
}

exports.createFruit = async (req, res) => {

  let { error } = validateAddFruit(req.body)

  if (error) {
    return res.status(400).json({
      message: error.details[0].message
    })
  }

  let imageVal = imageValidations(req)

  if (imageVal.error) {
    return res.status(400).json({
      message: imageVal.message
    })

  }

  const result = await fruitService.createFruit(req, res)

  return res.status(result.status).json(result)
}


// edit Fruit
exports.editFruit = async (req, res) => {

  let { error } = validateEditFruit(req.body)

  if (error) {
    return res.status(400).json({
      message: error.details[0].message
    })
  }

  let imageVal = imageValidations(req)

  if (imageVal.error) {
    return res.status(400).json({
      message: imageVal.message
    })
  }

  const result = await fruitService.editFruit(req, res)

  return res.status(result.status).json(result)
}

exports.deleteFruit = async (req, res) => {

  const result = await fruitService.deleteFruit(req, res)

  return res.status(result.status).json(result)
}