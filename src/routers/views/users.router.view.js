import { Router } from 'express'
import users from '../../data/fs/users.fs.js'

const usersRouter = Router()

usersRouter.get('/', async (req, res, next) => {
  try {
    const allUsers = await users.read()
   
    return res.render('users', {
      users: allUsers
    })
    
  } catch (error) {
    next(error)
  } 
})

usersRouter.get('/user', async (req, res, next) => {
  try {
    const singleUser = await users.readOne('c9ac4565bdbb09bc5ff28ef6')
    console.log(singleUser)
    return res.render('singleuser', {
      user: singleUser
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