import { Router } from 'express'
import productsRouter from './products.views-router.js'
import usersRouter from './users.views-router.js'

const viewsRouter = Router()

viewsRouter.get('/', async (req, res, next) => {
  try {
    const title = 'Hardware Store'

    return res.render('index', {
      title
    })
  } catch (error) {
    next(error)
  }
})

viewsRouter.get('/register', async (req, res, next) => {
  try {
    const title = 'Hardware Store - Register with us'
    res.render('new-user', {
      title
    })    
  } catch (error) {
    next(error)
  }
})

viewsRouter.get('/real', async (req, res, next) => {
  try {
    const title = 'Hardware Store - Products'
    return res.render('products', {
      title
    })  
  } catch (error) {
    next(error)
  }
})

viewsRouter.get('/form', async (req, res, next) => {
  try {
    const title = 'Hardware Store - Load new product'
    
    return res.render('new-product', {
      title
    })

  } catch (error) {
    next(error)
  }
})

viewsRouter.get('/form', async (req, res, next) => {
  try {
    return res.render('new-product')

  } catch (error) {
    next(error)
  }
})

viewsRouter.get('/users', async (req, res, next) => {
  try {
    return res.render('users')

  } catch (error) {
    next(error)
  }
})

viewsRouter.get('/users/user', async (req, res, next) => {
  try {
    const title = 'Hardware Store - Profile'

    return res.render('single-user', {
      title
    })

  } catch (error) {
    next(error)
  }
})

// viewsRouter.get('/orders', async (req, res, next) => {
//   try {
    
//   } catch (error) {
//     next(error)
//   }
// })



export default viewsRouter