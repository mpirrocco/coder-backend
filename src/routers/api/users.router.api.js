import { Router } from 'express'
import usersManager from '../../data/fs/users.fs.js'
import propsUsers from '../../middlewares/propsUsers.mid.js'

const usersRouter = Router()

usersRouter.post('/', propsUsers, async (req, res, next) => {
  const { name, image, email } = req.body
  try {
    const response = await usersManager.create(name, image, email)
    return res.json({
      statusCode: 201,
      message: response
    })

  } catch (error) {
    return next(error)
  }
})


usersRouter.get('/', async (req, res, next) => {
  try {
    const allUsers = await usersManager.read()
    console.log(allUsers)
    return res.json({
      statusCode: 200,
      message: allUsers
    })

  } catch (error) {
    return next(error)
  }
})

usersRouter.get('/:uid', async (req, res, next) => {
  const { uid } = req.params

  try {
    const singleUser = await usersManager.readOne(uid)
    if(singleUser === 'User not found') {
      return res.json({
        statusCode: 404,
        message: singleUser
      })
    } else {
      return res.json({
        statusCode: 200,
        message: singleUser
      })
    }    
  } catch (error) {
    return next(error)
  }
})

usersRouter.put('/:uid', async (req, res, next) => {
  const { uid } = req.params
  const { name, image, email } = req.body
  
  try {
    console.log(uid + ' ' + name)
    const updatedUser = await usersManager.updateUser(uid, name, image, email)   
    return res.json({
      statusCode: 200,
      message: updatedUser
    })
  } catch (error) {
    return next(error)
  }
})

export default usersRouter