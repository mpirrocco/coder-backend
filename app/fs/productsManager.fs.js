import fs from 'fs'
import crypto from 'crypto'

class ProductsManager {
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
    } catch (error) {
      return `There was an error getting the products catalogue, error: ${err}`
    }
  }

  async create(title, description, price, image, stock) {
    try {
      const newProd = {
        title, description, price, image, stock, id: this.generateID()
      }  
      
      let products = await this.read()
      console.log(products)
      products.push(newProd) 
      await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'))    

      return newProd
    } catch(err) {
      return `There was a problem adding your product, error: ${err}`
    }    
  }

  async readOne(pid) {
    try {
      const products = await this.read()
      // console.log(products)
      const foundProd = products.find((product) => product.id === pid)

      if(!prodFound) {
        return `Product not found with the provided ID`
      }
      // return foundProd
      return products
      
    } catch (error) {
      return `There was a problem getting your product, error: ${error}`
    }
  }
}

export default ProductsManager