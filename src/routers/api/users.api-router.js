import { Router } from 'express'
import __dirname from '../../../utils.js'
// import UsersManager from '../../data/fs/usersManager.fs.js'
// const usersManager = new UsersManager(`${__dirname}/src/data/fs/files/users.json`)

import { usersManager } from '../../data/mongo/manager.mongo.js'

const usersRouter = Router()

usersRouter.get('/', async (req, res) => {
  try {
    const allUsers = await usersManager.read()
    // va a necesitar parámetros para paginar, ordenar y filtrar
    if(allUsers.length > 0) {
      res.send({
        statusCode: 200,
        success: true,
        users: allUsers
      })
    } else {
      res.send({
        statusCode: 404,
        success: false,
        message: 'There are no users in our list yet'
      })
    }
  } catch (error) {
    return `There was an error: ${error} retrieving the users list`
  }
})

usersRouter.get('/:uid', async (req, res) => {
  try {
    const singleUser = await usersManager.readOne(req.params.uid)
    
    if (singleUser === 'User not found with the provided ID'){
      res.send({
        statusCode: 404,
        success: false,
        message: singleUser
      })
    } else {
      res.send({
        statusCode: 200,
        success: true,
        user: singleUser
      })
    }
  } catch (error) {
    return `There was an error: ${error} retrieving the products list`
  }
})

usersRouter.post('/', async (req, res) => {
  try {
    const { name, image, email } = req.body
    const allUsers = await usersManager.read()    
    const newUser = await usersManager.create(name, image, email)
    
    res.send({
      statusCode: 201,
      newUser: newUser
    })
  } catch (error) {
    return `There was an error: ${error} creating the new product`
  }
})

/*
usersRouter.put('/:uid', async (req, res) => {

})

usersRouter.delete('/:uid', async (req, res) => {

})

*/


export default usersRouter