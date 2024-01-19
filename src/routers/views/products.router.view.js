import { Router } from 'express'
import products from '../../data/fs/products.fs.js'

const productsRouter = Router()
const date = new Date()

productsRouter.get('/real', async (req, res, next) => {
  try {
    const allProducts = await products.read()
   
    return res.render('products', {
      products: allProducts,
      date
    })
    
  } catch (error) {
    next(error)
  } 
})

productsRouter.get('/form', (req, res, next) => {
  try {
    
    res.render('newproduct', { date })
  } catch (error) {
    next(error)
  }
})

productsRouter.get('/register', (req, res, next) => {
  try {
    res.render('newuser', { date })
  } catch (error) {
    next(error)
  }
})


export default productsRouter 