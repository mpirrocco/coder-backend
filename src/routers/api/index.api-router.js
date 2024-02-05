import { Router } from 'express'
import productsRouter from './products.api-router.js'
import usersRouter from './users.api-router.js'

const apiRouter = Router()

apiRouter.use('/products', productsRouter)
apiRouter.use('/users', usersRouter)




export default apiRouter