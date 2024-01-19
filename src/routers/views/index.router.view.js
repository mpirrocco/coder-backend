import { Router } from 'express'
import productsRouter from './products.router.view.js'
import usersRouter from './users.router.view.js'

const viewsRouter = Router()

viewsRouter.get('/', (req, res, next) => {
  try {

    const tools = ['screwdriver', 'hammer', 'twitch']
    
    const date = new Date()
    
    const details = 'This is our catalogue area'
    
    return res.render('index', { 
      tools: tools, 
      date, 
      details 
    })
  } catch (error) {
    next(error)
  }
})

viewsRouter.use('/', productsRouter)
viewsRouter.use('/users', usersRouter)

export default viewsRouter