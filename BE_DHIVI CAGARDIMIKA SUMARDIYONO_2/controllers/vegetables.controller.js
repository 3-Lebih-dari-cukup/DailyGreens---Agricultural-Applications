
const vegetableService = require('../services/vegetables.service')
const { imageValidations } = require('../validations/image.validation')
const { validateAddVegetable, validateEditVegetable } = require('../validations/vegetables.validation')

exports.getAllVegetables = async (req, res) => {

  const result = await vegetableService.getAllVegetables(req, res)

  return res.status(result.status).json(result)
}

exports.getDetailVegetable = async (req, res) => {

  const result = await vegetableService.getDetailVegetable(req, res)

  return res.status(result.status).json(result)
}

exports.createVegetable = async (req, res) => {

  let { error } = validateAddVegetable(req.body)

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

  const result = await vegetableService.createVegetable(req, res)

  return res.status(result.status).json(result)
}


// edit Vegetable
exports.editVegetable = async (req, res) => {

  let { error } = validateEditVegetable(req.body)

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

  const result = await vegetableService.editVegetable(req, res)

  return res.status(result.status).json(result)
}

exports.deleteVegetable = async (req, res) => {

  const result = await vegetableService.deleteVegetable(req, res)

  return res.status(result.status).json(result)
}