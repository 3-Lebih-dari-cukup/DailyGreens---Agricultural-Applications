const joi = require('joi')

exports.validateAddFruit = (fruit) => {
  const schema = joi.object({
    name: joi.string().min(3).required(),
    description: joi.string().min(3).required(),
    price: joi.number().required(),
    stock: joi.number().required(),
    address: joi.string().min(3).required(),
    seller: joi.string().min(3).required(),
  })

  return schema.validate(fruit)
}

exports.validateEditFruit = (fruit) => {
  const schema = joi.object({
    name: joi.string().min(3).required(),
    description: joi.string().min(3).required(),
    price: joi.number().required(),
    stock: joi.number().required(),
    address: joi.string().min(3).required(),
    seller: joi.string().min(3).required(),
  })

  return schema.validate(fruit)
}
