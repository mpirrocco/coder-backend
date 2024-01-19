import { Router } from 'express'
import viewsRouter from './views/index.router.view.js'
import apiRouter from './api/index.router.api.js'

const router = Router()
router.use('/', viewsRouter)
router.use('/api', apiRouter)


export default router