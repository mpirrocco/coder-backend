import { Router } from 'express'
import products from '../../data/fs/products.fs.js'

const productsRouter = Router()

productsRouter.get('/real', async (req, res, next) => {
  try {
    const allProducts = await products.read()
   
    return res.render('products', {
      products: allProducts
    })
    
  } catch (error) {
    next(error)
  } 
})

productsRouter.get('/form', (req, res, next) => {
  try {
    res.render('newproduct', {})
  } catch (error) {
    next(error)
  }
})

productsRouter.get('/register', (req, res, next) => {
  try {
    res.render('newuser', {})
  } catch (error) {
    next(error)
  }
})


export default productsRouter 