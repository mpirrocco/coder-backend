import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'
import { engine } from 'express-handlebars'
import morgan from 'morgan'
import router from './src/routers/index.router.js'
import errorHandler from './src/middlewares/errorHandler.mid.js'
import pathHandler from './src/middlewares/pathHandler.mid.js'
import __dirname from './utils.js'
import products from './src/data/fs/products.fs.js'

// Server instantiation
const server = express()
const PORT = 8080
const ready = console.log(`Server is running on port: ${PORT}`)
const httpServer = createServer(server)
const socketServer = new Server(httpServer)



server.use(express.json())
server.use(express.urlencoded({ extended: true }))
server.use(express.static(__dirname + '/public'))
server.use(morgan('dev'))

// Template engine
server.engine('handlebars', engine())
server.set('view engine', 'handlebars')
server.set('views', __dirname + '/src/views')

// These 3 go always at the end in this order
server.use('/', router)
server.use(errorHandler)
server.use(pathHandler)

// Initiate server and socket connection
httpServer.listen(PORT, ready)

socketServer.on('connection', async (socket) => {

  socket.emit('welcome', 'Welcome to our hardware store')

  const allProducts = await products.read()  
  socket.emit('loaded products', allProducts)

  socket.on('new product', async(data) => {
    try {
      
      // metodo de agregar al arreglo de prods

      const newProduct = await products.create(data.title, data.description, data.price, data.image, data.stock)
      // console.log(newProduct)
      console.log(newProduct)

      allProducts.push(newProduct)

      socket.emit('loaded products', allProducts)

      // socket.emit('success', 'product added')
    } catch (error) {
      console.log(error)
    }
  })
  
})

