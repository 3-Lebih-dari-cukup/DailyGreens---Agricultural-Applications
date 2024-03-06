const joi = require('joi')

exports.validateAddVegetable = (vegetable) => {
  const schema = joi.object({
    name: joi.string().min(3).required(),
    description: joi.string().min(3).required(),
    price: joi.number().required(),
    stock: joi.number().required(),
    address: joi.string().min(3).required(),
    seller: joi.string().min(3).required(),
  })

  return schema.validate(vegetable)
}

exports.validateEditVegetable = (vegetable) => {
  const schema = joi.object({
    name: joi.string().min(3).required(),
    description: joi.string().min(3).required(),
    price: joi.number().required(),
    stock: joi.number().required(),
    address: joi.string().min(3).required(),
    seller: joi.string().min(3).required(),
  })

  return schema.validate(vegetable)
}
