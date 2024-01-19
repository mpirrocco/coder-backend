import { Router } from 'express'
import productsManager from '../../data/fs/products.fs.js'
import propsProducts from '../../middlewares/propsProducts.mid.js'

const productsRouter = Router()

productsRouter.post('/', propsProducts, async (req, res, next) => {
  const { title, description, price, image, stock } = req.body
  try {
    const response = await productsManager.create(title, description, price, image, stock)
    return res.json({
      statusCode: 201,
      message: response
    })

  } catch (error) {
    return next(error)
  }
})

productsRouter.get('/', async (req, res, next) => {
  try {
    const allProducts = await productsManager.read()
    
    if(allProducts.length > 0) {
      return res.json({
        statusCode: 200,
        message: allProducts
      })
    } else {
      return res.json({
        statusCode: 200,
        message: 'There are no available products at the moment'
      })
    }    
  } catch (error) {
    return next(error)
  }
})

productsRouter.get('/:pid', async (req, res, next) => {
  const { pid } = req.params

  try {
    const singleProduct = await productsManager.readOne(pid)
    if(singleProduct === 'Product not found') {
      return res.json({
        statusCode: 404,
        message: singleProduct
      })
    } else {
      return res.json({
        statusCode: 200,
        message: singleProduct
      })
    }    
  } catch (error) {
    return next(error)
  }
})

productsRouter.put('/:pid', async (req, res, next) => {
  const { pid } = req.params
  const { title, description, price, image, stock } = req.body

  try {
    const updatedProd = await productsManager.updateProduct(pid, title, description, price, image, stock)   
    return res.json({
      statusCode: 200,
      message: updatedProd
    })
  } catch (error) {
    return next(error)
  }
})

productsRouter.delete('/:pid', async (req, res, next) => {
  const { pid } = req.params
 
  try {
    const deleteProduct = await productsManager.deleteProduct(pid)
    return res.json({
      statusCode: 200,
      message: deleteProduct
    })
  } catch (error) {
    return next(error)
  }
})

export default productsRouter