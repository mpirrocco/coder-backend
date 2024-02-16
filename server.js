import 'dotenv/config.js'
 

import express, { urlencoded } from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'
import { engine } from 'express-handlebars'
import morgan from 'morgan'
import socketUtils from "./src/utils/socket.utils.js";

import __dirname from './utils.js'

import router from './src/routers/index.router.js'
import ProductsManager from './src/data/fs/productsManager.fs.js'
// import errorHandler from './src/middlewares/errorHandler.js'
// import pathHandler from './src/middlewares/pathHandler.js'
import dbConnection from './src/utils/db.js'

const productsManager = new ProductsManager(`${__dirname}/src/data/fs/files/products.json`)


// SERVER CONFIGURATION AND INITIALIZATION
const server = express()
const PORT = process.env.PORT || 8080
const httpServer = createServer(server)
httpServer.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`)
  // dbConnection()
})

const io = new Server(httpServer)

io.on('connection', async (socket) => {
  // console.log(socket.id)
  io.emit('welcome', 'Welcome to the store baby') 

  io.emit('productsList', await productsManager.read())  

  socket.on('newProduct', async (data) => {
    try {
      console.log(data)
      await productsManager.create(data)
      socket.emit('newProductAdded', 'New product was added to the catalogue')      
    } catch (error) {
      console.log(error)
    }

  })
})


// MIDDLEWARES
server.use(express.json())
server.use(urlencoded({ extended: true }))
server.use(express.static(__dirname + '/public'))
server.use(morgan('dev'))

// TEMPLATE ENGINE
server.engine('handlebars', engine())
server.set('view engine', 'handlebars')
server.set('views', __dirname + '/src/views')


// These 3 go always at the end in this order
// ENDPOINTS
server.use('/', router)
// server.use(errorHandler)
// server.use(pathHandler)














