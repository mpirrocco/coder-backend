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
        console.log(this.path)
        let products = await fs.promises.readFile(this.path)
        return products = JSON.parse(products)
      } else {
        return []
      }
    } catch (error) {
      return `There was an error getting the products catalogue, error: ${err}`
    }
  }

  async create(title, description, price, image, stock, id = this.generateID()) {
    try {
      const newProd = {
        title, description, price, image, stock, id
      }  
      
      let products = await this.read()
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
      const foundProd = products.find((product) => product.id === pid)
      console.log(foundProd)
      
      if(!foundProd) {
        return `Product not found with the provided ID`
      }
      return foundProd
      
    } catch (error) {
      return `There was a problem getting your product, error: ${error}`
    }
  }

  async destroy(pid) {
    try {
      const products = await this.read()
      const foundProd = products.findIndex((product) => product.id === pid)
      
      if(foundProd !== -1) {
        products.splice(foundProd, 1)
        await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'))    
      } else {
        return 'There is no product available with the provided ID'
      }

      return products
    
    } catch (error) {
      return `There was a problem deleting your product, error: ${error}`
    }
  }
}

export default ProductsManager