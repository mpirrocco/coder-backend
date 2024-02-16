import User from './models/user.model.js'
import Product from './models/product.model.js'

class MongoManager {
  constructor(model){
    this.model = model
  }
  
  async create(data) {
    try {
      const one = await this.model.create(data)
      return one._id
    } catch (error) {
      throw error
    }
  }
  async read() {
    try {
      const all = await this.model.find()
      if(all.length === 0) {
        const error = new Error('There are no results for your query')
        error.statusCode = 404
        throw error
      }
      return all
    } catch (error) {
      throw error
    }
  }
  async readOne(id) {
    try {
      const one = await this.model.findById(id)
      if(!one) {
        const error = new Error('There is no result for your query')
        error.statusCode = 404
        throw error
      }
      return one
    } catch (error) {
      throw error
    }
  }
  async update(id, data) {
    try {
      const opt = { new: true }
      // este objeto de configuración OPCIONAL devuelve el objeto luego de la modificación
      const one = this.model.findByIdAndUpdate(id, data, opt)   
    } catch (error) {
      throw error
    }
  }
  async destroy(id) {
    try {
      const one = await this.model.findByIdAndDelete(id, opt)
      if(!one) {
        const error = new Error('There is no result for your query')
        error.statusCode = 404
        throw error
      }
    } catch (error) {
      throw error
    }
  }
}

const usersManager = new MongoManager(User)
const productsManager = new MongoManager(Product)

export { usersManager, productsManager }
