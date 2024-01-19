import { Router } from 'express'
import ordersManager from '../../data/fs/orders.fs.js'
import usersManager from '../../data/fs/users.fs.js'
import productsManager from '../../data/fs/users.fs.js'

const ordersRouter = new Router()

ordersRouter.post('/', async (req, res, next) => {
  const { pid, uid, qty, state } = req.body
  
  try {
    const placeOrder = await ordersManager.create(pid, uid, qty, state)
    
    return res.json({
      statusCode: 200,
      message: placeOrder
    })

  } catch (error) {
    return next(error)
  }

})

ordersRouter.get('/', async(req, res, next) => {
  try {
    const list = await ordersManager.read()
    console.log(list)

    return res.json({
      statusCode: 200,
      message: list
    })
  } catch (error) {
    return next(error)
  }
})

ordersRouter.get('/:oid', async(req, res, next) => {
  const { oid } = req.params
  try {
    const order = await ordersManager.readOne(oid)

    return res.json({
      statusCode: 200,
      message: order
    })
  } catch (error) {
    return next(error)
  }
})

ordersRouter.get('/byuser/:uid', async(req, res, next) => {
  const { uid } = req.params
  try {
    const orders = await ordersManager.readByUser(uid)

    return res.json({
      statusCode: 200,
      message: orders
    })
  } catch (error) {
    return next(error)
  }
})

ordersRouter.put('/:oid', async (req, res, next) => {
  const { oid } = req.params
  const { qty, state } = req.body
  try {
    const updateOrder = await ordersManager.update(oid, qty, state)
    
    res.json({
      statusCode: 200,
      message: updateOrder
    })
  } catch (error) {
    return next(error)
  }
})

ordersRouter.delete('/:oid', async (req, res, next) => {
  const { oid } = req.params
  try {
    const deleteOrder = await ordersManager.destroy(oid)
    
    res.json({
      statusCode: 200,
      message: deleteOrder
    })
  } catch (error) {
    return next(error)
  }
})


export default ordersRouter