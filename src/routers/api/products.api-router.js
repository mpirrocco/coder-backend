import { Router } from 'express'
import __dirname from '../../../utils.js'
// import ProductsManager from '../../data/fs/productsManager.fs.js'
// const productsManager = new ProductsManager(`${__dirname}/src/data/fs/files/products.json`)

import { productsManager } from '../../data/mongo/manager.mongo.js'


const productsRouter = Router()

productsRouter.get('/', async (req, res) => {
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
        message: 'There are no products in our catalogue yet'
      })
    }
  } catch (error) {
    return `There was an error: ${error} retrieving the products list`
  }
})

/*

productsRouter.get('/:uid', async (req, res) => {
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
        user: singleUser
      })
    }
  } catch (error) {
    return `There was an error: ${error} retrieving the products list`
  }
})

productsRouter.post('/', async (req, res) => {
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


productsRouter.put('/:uid', async (req, res) => {

})

productsRouter.delete('/:uid', async (req, res) => {

})


*/

export default productsRouter
