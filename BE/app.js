const express = require('express')
const app = express()
const port = 3000
const path = require('path')
const fileUpload = require('express-fileupload')
const joi = require('joi')
const fs = require('fs')
var cors = require('cors')

app.use(express.static(path.join(__dirname,'public')))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(fileUpload())
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });
app.use(cors());

let produkBuah = [
    {
        id : 1,
        name : "Mangga",
        description : "Buah Mangga segar dari Eropa",
        price : 15000,
        stock : 2,
        address : "Bandung",
        seller : "Mang Asep",
        image : "/images/manggo.jpg"
    },
    {
        id : 2,
        name : "apel",
        description : "Buah apel segar dari Jepang",
        price : 25000,
        stock : 6,
        address : "Cimahi",
        seller : "Mang Ago",
        image : "/images/apple.jpg"
    },
    {
        id : 3,
        name : "Watermelon",
        description : "Buah semangka segar dari banjarmasin",
        price : 5000,
        stock : 122,
        address : "Jakarta",
        seller : "Mang Toman",
        image : "/images/watermelon.jpg"
    }
]

let produkSayuran = [
    {
        id : 1,
        name : "Bayam",
        description : "Sayur bayam segar dari london",
        price : 15000,
        stock : 2,
        address : "London",
        seller : "Bu Timah",
        image : "/images/spinach.jpg"
    },
    {
        id : 2,
        name : "Kangkung",
        description : "Sayur Kangkung segar dari Eropa",
        price : 15000,
        stock : 5,
        address : "Bandung",
        seller : "King Kong",
        image : "/images/lettuce.jpg"
    },
    {
        id : 3,
        name : "Bawang",
        description : "Bawang dari jepang",
        price : 115000,
        stock : 22,
        address : "Jepang",
        seller : "Ryo Hitoshi",
        image : "/images/onion.jpg"
    }
]

//Validate Products
const validateProduct = (product) => {
  const schema = joi.object({
    name: joi.string().min(3).required(),
    description: joi.string().min(3).required(),
    price: joi.number().required(),
    stock: joi.number().required(),
    address: joi.string().min(3).required(),
    seller: joi.string().min(3).required(),
  })

  return schema.validate(product)
}

app.get('/', (req, res) => {
  res.send('Selamat datang di DailyGreens!')
})

//Route Fruits

//Get All Fruits
app.get('/fruits', (req, res) => {
    const name = req.query.name

    if(name){
        const fruit = produkBuah.find(fruit => fruit.name.toLowerCase() == name)

    if(!fruit) (
        res.status(404).json({
            messages: "Fruit cannot found"
        })
    )

    res.status(200).json({
        messages: "Fruit detail successfully obtained",
        data : fruit
    })
    }
    res.status(200).json({
        messages: "All product obtained successfully",
        data : produkBuah
    })
  })

//Get Fruit details by ID
app.get('/fruits/:id', (req, res) => {
    const id = req.params.id

    const fruit = produkBuah.find(fruit => fruit.id == id)

    if(!fruit) (
        res.status(404).json({
            messages: "Fruit cannot found"
        })
    )

    res.status(200).json({
        messages: "Fruit detail successfully obtained",
        data : fruit
    })
    
  })

//Add New Fruit
app.post('/fruits', (req, res) => {
    const {name, description, price, stock, address, seller} = req.body
  
    const id = produkBuah.length + 1;
  
    const {error} = validateProduct(req.body)
  
    if(error) {
      return res.status(400).json({
        messages: error.details[0].message
      })
    }
  
    const image = req.files.image
    const filename = `${name}.jpg`
  
    image.mv(path.join(__dirname, 'public/images', filename))
  
  
    const newBuah = {
      id,
      name,
      description,
      price,
      stock,
      address,
      seller,
      image: `/images/${filename}`,
    }
  
    console.log(newBuah)
  
    produkBuah.push(newBuah)
  
    res.status(201).json({
      messages: "Fruit successfully added",
      data: newBuah
    })
  })

//Edit Fruit
app.put('/fruits/:id', (req, res) => {
    const id = req.params.id
    const {name, description, price, stock, address, seller} = req.body
  
    const {error} = validateProduct(req.body)
  
    if(error) {
      return res.status(400).json({
        messages: error.details[0].message
      })
    }
  
    const fruit = produkBuah.find(fruit => fruit.id == id)
  
    if(!fruit) {
      return res.status(404).json({
        messages: "Data Not Found"
      })
    }
  
    const fileNameOld = `${fruit.name}.jpg`
    fruit.name = name
    fruit.description = description
    fruit.price = price
    fruit.stock = stock
    fruit.address = address
    fruit.seller = seller
  
    const image = req.files.image
    // const filename = `${name}.jpg`
  
    // image.mv(path.join(__dirname, 'public/images', filename))
  
    if(image) {
      try{
        fs.unlinkSync(path.join(__dirname, 'public/images', fileNameOld))
      }catch(err) {
        console.log(err)
      }
      const filename = `${name}.jpg`
      // image.mv(path.join(__dirname, 'public/images', filename))
      console.log(image.mv(path.join(__dirname, 'public/images', filename)))
      fruit.image = `/images/${filename}`
    }
  
    res.status(200).json({
      messages: "Success Update Data",
      data: fruit
    })
  })

//Delete Fruit
app.delete('/fruits/:id', (req, res) => {
  const id = req.params.id

  const fruit = produkBuah.find(fruit => fruit.id == id)

  if(!fruit) {
    return res.status(404).json({
      messages: "Data Not Found"
    })
  }

  const index = produkBuah.indexOf(fruit)
  produkBuah.splice(index, 1)

  res.status(200).json({
    messages: "Success Delete Data",
    data: fruit
  })
})

//Route Vegetables

//Get All Vegetables
app.get('/vegetables', (req, res) => {
  const name = req.query.name

  if(name){
      const vegetable = produkSayuran.find(vegetable => vegetable.name.toLowerCase() == name)

  if(!vegetable) (
      res.status(404).json({
          messages: "Vegetable not found"
      })
  )

  res.status(200).json({
      messages: "Vegetable detail successfully obtained",
      data : vegetable
  })
  }
  res.status(200).json({
      messages: "All product obtained successfully",
      data : produkSayuran
  })
})

//Get Vegetable details by ID
app.get('/vegetables/:id', (req, res) => {
  const id = req.params.id

  const vegetable = produkSayuran.find(vegetable => vegetable.id == id)

  if(!vegetable) (
      res.status(404).json({
          messages: "Vegetable cannot be found"
      })
  )

  res.status(200).json({
      messages: "Vegetable detail successfully obtained",
      data : vegetable
  })
  
})

//Add New Vegetable
app.post('/vegetables', (req, res) => {
  const {name, description, price, stock, address, seller} = req.body

  const id = produkSayuran.length + 1;

  const {error} = validateProduct(req.body)

  if(error) {
    return res.status(400).json({
      messages: error.details[0].message
    })
  }

  const image = req.files.image
  const filename = `${name}.jpg`

  image.mv(path.join(__dirname, 'public/images', filename))


  const newSayur = {
    id,
    name,
    description,
    price,
    stock,
    address,
    seller,
    image: `/images/${filename}`,
  }

  console.log(newSayur)

  produkSayuran.push(newSayur)

  res.status(201).json({
    messages: "Vegetable successfully added",
    data: newSayur
  })
})

//Edit Vegetable
app.put('/vegetables/:id', (req, res) => {
  const id = req.params.id
  const {name, description, price, stock, address, seller} = req.body

  const {error} = validateProduct(req.body)

  if(error) {
    return res.status(400).json({
      messages: error.details[0].message
    })
  }

  const vegetable = produkSayuran.find(vegetable => vegetable.id == id)

  if(!vegetable) {
    return res.status(404).json({
      messages: "Data Not Found"
    })
  }

  const fileNameOld = `${vegetable.name}.jpg`
  vegetable.name = name
  vegetable.description = description
  vegetable.price = price
  vegetable.stock = stock
  vegetable.address = address
  vegetable.seller = seller

  const image = req.files.image
  // const filename = `${name}.jpg`

  // image.mv(path.join(__dirname, 'public/images', filename))

  if(image) {
    try{
      fs.unlinkSync(path.join(__dirname, 'public/images', fileNameOld))
    }catch(err) {
      console.log(err)
    }
    const filename = `${name}.jpg`
    // image.mv(path.join(__dirname, 'public/images', filename))
    console.log(image.mv(path.join(__dirname, 'public/images', filename)))
    vegetable.image = `/images/${filename}`
  }

  res.status(200).json({
    messages: "Success Update Data",
    data: vegetable
  })
})

//Delete Vegetable
app.delete('/vegetables/:id', (req, res) => {
const id = req.params.id

const vegetable = produkSayuran.find(vegetable => vegetable.id == id)

if(!vegetable) {
  return res.status(404).json({
    messages: "Data Not Found"
  })
}

const index = produkSayuran.indexOf(vegetable)
produkSayuran.splice(index, 1)

res.status(200).json({
  messages: "Success Delete Data",
  data: vegetable
})
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})