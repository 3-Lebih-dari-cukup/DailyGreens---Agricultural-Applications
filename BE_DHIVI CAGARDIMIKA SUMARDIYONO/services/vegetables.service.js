const { vegetables } = require('../models')
const { rupiahFormat } = require('../helpers/rupiahFormat.helper')
const { saveImage } = require('../helpers/saveImage.helper')
const fs = require('fs')
const { deleteImageHelper } = require('../helpers/deleteImage.helper')

exports.getAllVegetables = async (req, res) => {

  const data = await vegetables.findAll()

  // convert data price to rupiah format
  const dataConvertRupiah = data.map(item => {
    item.price = rupiahFormat(item.price)
    return item
  })

  return {
    status: 200,
    data: dataConvertRupiah,
    message: "Success Get All Data"
  }
}

exports.getDetailVegetable = async (req, res) => {
  const { id } = req.params

  const data = await vegetables.findOne({ where: { id } })

  if (!data) {
    return {
      status: 404,
      message: "Data Not Found"
    }
  }

  return {
    status: 200,
    data,
    message: "Success Get Detail Data"
  }
}

exports.createVegetable = async (req, res) => {
  const { name, description, price, stock, address, seller, } = req.body
  const slug = name.toLowerCase().split(' ').join('-')

  const imageFilePath = await saveImage(req.files.image, slug, "vegetables")

  const data = await vegetables.create({ name, description, price, stock, address, seller, image: imageFilePath })

  return {
    status: 201,
    data: req.body,
    message: "Success Create Data"
  }
}


exports.editVegetable = async (req, res) => {
  const { id } = req.params

  const data = await vegetables.findOne({ where: { id } })

  if (!data) {
    return {
      status: 404,
      message: "Data Not Found"
    }
  }

  const { name, description, price, stock, address, seller, } = req.body
  const slug = name.toLowerCase().split(' ').join('-')

  deleteImageHelper(data.image)

  const imageFilePath = await saveImage(req.files.image, slug, "vegetables")

  console.log(imageFilePath)

  await vegetables.update({ name, description, price, stock, address, seller, image: imageFilePath }, { where: { id } })

  return {
    status: 200,
    data: req.body,
    message: "Success Update Data"
  }
}

exports.deleteVegetable = async (req, res) => {
  const { id } = req.params

  const data = await vegetables.findOne({ where: { id } })

  if (!data) {
    return {
      status: 404,
      message: "Data Not Found"
    }
  }

  deleteImageHelper(data.image)

  await vegetables.destroy({ where: { id } })

  return {
    status: 200,
    message: "Success Delete Data"
  }
}