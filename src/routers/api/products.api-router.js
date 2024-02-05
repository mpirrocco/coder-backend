import { Router } from 'express'
import __dirname from '../../../utils.js'
import ProductsManager from '../../data/fs/productsManager.fs.js'
const productsManager = new ProductsManager(`${__dirname}/src/data/fs/files/products.json`)


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

export default productsRouter
