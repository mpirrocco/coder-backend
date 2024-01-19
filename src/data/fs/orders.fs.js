import fs from 'fs'
import crypto from 'crypto'

class OrdersManager {
  constructor(path) {
    this.path = path
  }

  generateID() {
    const id = crypto.randomBytes(12).toString('hex')
    return id
  }

  async read() {    
    try {
      if(fs.existsSync(this.path)) {
        let products = await fs.promises.readFile(this.path)
        return products = JSON.parse(products)
      } else {         
        return [] 
      }   
    } catch(err) {
      return `There was an error getting the products catalogue, error: ${err}`
    }
  }

  async create(pid, uid, qty, state) {
    try {
      const newOrder = {
        uid, pid, qty, state
      }

      let ordersList = await this.read()
      console.log(ordersList)
      newOrder.oid = this.generateID()

      ordersList.push(newOrder)
      await fs.promises.writeFile(this.path, JSON.stringify(ordersList, null, '\t'))

      return newOrder

    } catch (error) {
      return `There was an error (${error} creating your order)`
    }
  }

  async readByUser(uid) {
    try {
      const ordersList = await this.read()
      const userOrders = ordersList.filter((order) => order.uid === uid)

      if(userOrders.length > 0) {
        return userOrders
      } else {
        return `There are no orders placed for that user`
      }

    } catch (error) {
      return `There was an error retrieving the list`
    }
  } 

  async readOne(oid) {
    try {
      const orders = await this.read()
      const foundOrder = orders.find(order => order.oid === oid) 
      if(!foundOrder) {
       return 'Order not found with specified ID'
      }
      return foundOrder 
    } catch(err) {
      return `There was a problem getting your order, error: ${err}`
    }
  }

  async update(oid, qty, state) {
    try {
      const orders = await this.read()
      const foundOrder = await this.readOne(oid)
      
      if(foundOrder !== 'Order not found') {
        foundOrder.qty = qty
        foundOrder.state = state
        
        const index = orders.findIndex((order) => order.oid === foundOrder.oid) 

        orders.splice(index, 1, foundOrder)
        await fs.promises.writeFile(this.path, JSON.stringify(orders, null, '\t')) 

        return `The order ${oid} was updated to ${qty} items and state: ${state}`
      } else {
        return `Order not found with the provided ID`
      }

    } catch(err) {
      return `There was an error (${err}) getting the updated order`
    }
  } 

  async destroy(oid) {
    try {
      const orders = await this.read()
      const foundOrder = await this.readOne(oid)
      
      if(foundOrder !== 'Order not found') {
        
        const index = orders.findIndex((order) => order.oid === foundOrder.oid) 

        orders.splice(index, 1)
        await fs.promises.writeFile(this.path, JSON.stringify(orders, null, '\t')) 

        return `The order ${oid} was deleted`
      } else {
        return `Order not found with the provided ID`
      }
    } catch (error) {
      return `There was an error (${err}) getting the order to delete`
    }
  }

}

const ordersManager = new OrdersManager('./src/data/fs/files/orders.json')
export default ordersManager