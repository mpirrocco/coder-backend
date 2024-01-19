import { Router } from 'express'
import users from '../../data/fs/users.fs.js'

const usersRouter = Router()

usersRouter.get('/', async (req, res, next) => {
  try {
    const user = await users.readOne('1674a8c5e5d08b6994ddfada')
   
    return res.render('singleuser', {
      user: user
    })
    
  } catch (error) {
    next(error)
  } 
})

usersRouter.get('/allusers', async (req, res, next) => {
  try {
    const allUsers = await users.read()
   
    return res.render('users', {
      users: allUsers
    })
    
  } catch (error) {
    next(error)
  } 
})

usersRouter.get('/new', (req, res, next) => {
  try {
    res.render('newuser', {})
  } catch (error) {
    next(error)
  }
})


export default usersRouter