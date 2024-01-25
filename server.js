import express, { urlencoded } from 'express'
import ProductsManager from "./src/data/fs/productsManager.fs.js"
import UsersManager from "./src/data/fs/usersManager.fs.js"
const productsManager = new ProductsManager('./src/data/fs/files/products.json')
const usersManager = new UsersManager('./src/data/fs/files/users.json')

// SERVER CONFIGURATION AND MIDDLEWARE
const server = express()
server.use(express.json())
server.use(urlencoded({ extended: true }))

// ENDPOINTS FOR PRODUCTS
server.get('/api/products', async (req, res) => {
  try {
    const allProducts = await productsManager.read()
    if(allProducts.length > 0) {
      res.send({
        statusCode: 200,
        success: true,
        products: allProducts
      })
    } else {
      res.send({
        statusCode: 404,
        success: false,
        message: 'There are no available products at this time'
      })
    }
  } catch (error) {
    return `There was an error: ${error} retrieving the products list`
  }
})

server.get('/api/products/:pid', async (req, res) => {
  try {
    const singleProduct = await productsManager.readOne(req.params.pid)
    
    if (singleProduct === 'Product not found with the provided ID'){
      res.send({
        statusCode: 404,
        success: false,
        message: 'There is no available product with the provided ID'
      })
    } else {
      res.send({
        statusCode: 200,
        success: true,
        products: singleProduct
      })
    }
  } catch (error) {
    return `There was an error: ${error} retrieving the products list`
  }
})

server.post('/api/products', async (req, res) => {
  try {
    const { title, description, image, price, stock } = req.body
    const allProducts = await productsManager.read()    
    const newProd = await productsManager.create(title, description, image, price, stock)
    console.log(req.body)
    res.send({
      statusCode: 201,
      newProduct: newProd
    })
  } catch (error) {
    return `There was an error: ${error} creating the new product`
  }
})


// ENDPOINTS FOR USERS
server.get('/api/users', async (req, res) => {
  try {
    const allUsers = await usersManager.read()
    if(allUsers.length > 0) {
      res.send({
        statusCode: 200,
        success: true,
        products: allUsers
      })
    } else {
      res.send({
        statusCode: 404,
        success: false,
        message: 'There are no users in our list yet'
      })
    }
  } catch (error) {
    return `There was an error: ${error} retrieving the users list`
  }
})

server.get('/api/users/:uid', async (req, res) => {
  try {
    const singleUser = await usersManager.readOne(req.params.uid)
    
    if (singleUser === 'User not found with the provided ID'){
      res.send({
        statusCode: 404,
        success: false,
        message: singleUser
      })
    } else {
      res.send({
        statusCode: 200,
        success: true,
        products: singleUser
      })
    }
  } catch (error) {
    return `There was an error: ${error} retrieving the products list`
  }
})

server.post('/api/users', async (req, res) => {
  try {
    const { name, image, email } = req.body
    const allUsers = await usersManager.read()    
    const newUser = await usersManager.create(name, image, email)
    
    res.send({
      statusCode: 201,
      newUser: newUser
    })
  } catch (error) {
    return `There was an error: ${error} creating the new product`
  }
})



// SERVER INITIALIZATION
const PORT = process.env.PORT || 8080
server.listen(PORT, () => console.log(`Server is running on port: ${PORT}`))












