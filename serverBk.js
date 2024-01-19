import crypto from 'crypto'
import express, { urlencoded } from 'express'
import fs from 'fs'

import productsManager from './src/data/fs/products.fs.js'
import usersManager from './src/data/fs/users.fs.js'
// import productsManager from './data/memory/products.memory.js'
// import usersManager from './data/memory/users.memory.js'

// Server setup
const server = express()
server.use(express.json())
server.use(urlencoded({ extended: true }))

// Entry endpoint 
server.get('/', (req, res) => {
  res.send('Server online')
})

// Products endpoints
server.post('/api/products', async (req, res) => {
  const { title, description, price, image, stock } = req.body
  
  try {
    const response = await productsManager.create(title, description, price, image, stock)
    
    return res.json({
      statusCode: 201,
      message: response
    })
  
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
})

server.get('/api/products', async (req, res) => {
  try {
    const productsList = await productsManager.read()

    if(productsList.length > 0) {
      return res.json({
        success: true,
        message: productsList
      })
    } else {
      return res.json({
        success: false,
        message: 'There are no available products at the moment'
      })
    }
    
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
})

server.get('/api/products/:pid', async (req, res) => {
  const pid = req.params.pid
  try {
    const product = await productsManager.readOne(pid)
    if(product) {
      res.json({
        success: true,
        message: product
      })
    } else {
      res.status(404).json({
        success: false,
        message: 'not found!'
      })
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
})


// Users endpoints
server.post('/api/users', async (req, res) => {
  const { name, image, email } = req.body
  
  try {
    const response = await usersManager.create(name, image, email)
    
    return res.json({
      statusCode: 201,
      message: response
    })
  
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
})

server.get('/api/users', async (req, res) => {
  try {
    const usersList = await usersManager.read()
    res.json({
      success: true,
      message: usersList
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
})

server.get('/api/users/:uid', async (req, res) => {
  const uid = req.params.uid
  try {
    const user = await usersManager.readOne(uid)
    if(user) {
      res.json({
        success: true,
        message: user
      })
    } else {
      res.status(404).json({
        success: false,
        message: 'User not found'
      })
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
})





// Create sample products with node server.js
// productsManager.create('Screwdriver', 'Phillips style',30, 'no image', 3)
// productsManager.create('Screwdriver', 'Flat style', 60, 'no image', 3)
// productsManager.create('Wrench', '6" adjustable', 160, 'no image', 3)


// Create sample users with node server.js
// usersManager.create('Mario Pirrocco', 'no image', 'mario@mail.com')
// usersManager.create('Andrea deSouza', 'no image', 'andrea@mail.com')
// usersManager.create('Ramón Cardozo', 'no image', 'ramon@mail.com')


const PORT = 8080
server.listen(PORT, () => console.log(`Server is up and running in port: ${PORT}`))