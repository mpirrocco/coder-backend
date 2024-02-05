// ROUTER CONFIGURATION
import { Router } from 'express'
import apiRouter from './api/index.api-router.js'
import viewsRouter from './views/index.views-router.js'
const router = Router()

router.use('/api', apiRouter)
router.use('/', viewsRouter)

export default router