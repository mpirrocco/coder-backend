import crypto from 'crypto'
import express, { urlencoded } from 'express'
import fs from 'fs'

import productsManager from './data/fs/products.fs.js'
import usersManager from './data/fs/users.fs.js'

// Server setup
const server = express()
server.use(urlencoded({ extended: true }))

// Entry endpoint 
server.get('/', (req, res) => {
  res.send('Server online')
  console.log(usersManager)
})

// Products endpoints
server.get('/api/products', async (req, res) => {
  try {
    const productsList = await productsManager.read()
    res.json({
      success: true,
      message: productsList
    })
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
// .then(res => productsManager.create('Screwdriver', 'Flat style', 60, 'no image', 3))
// .then(res => productsManager.create('Wrench', '6" adjustable', 160, 'no image', 3))


// Create sample users with node server.js
// usersManager.create('Mario Pirrocco', 'no image', 'mario@mail.com')
// .then(res => usersManager.create('Andrea deSouza', 'no image', 'andrea@mail.com'))
// .then(res => usersManager.create('Ramón Cardozo', 'no image', 'ramon@mail.com'))


const PORT = 8080
server.listen(PORT, () => console.log(`Server is up and running in port: ${PORT}`))