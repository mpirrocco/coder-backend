import fs from 'fs'
import crypto from 'crypto'

class ProductManager {
  constructor(path) {
    this.path = path
  }
  
  generateID() {
    const id = crypto.randomBytes(12).toString('hex')
    console.log(id)
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


  async create(title, description, price, image, stock) {
    try {
      const newProd = {
        title, description, price, image, stock
      }  
      
      let products = await this.read()
      newProd.id = this.generateID()
       
      products.push(newProd) 
      await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'))    

      return newProd
    } catch(err) {
      return `There was a problem adding your product, error: ${err}`
    }    
  }

  
  async readOne(id) {
    try {
      const products = await this.read()
      const foundProd = products.find(prod => prod.id === id) 
      if(!foundProd) {
       return 'Product not found with specified ID'
      }
      return foundProd 
    } catch(err) {
      return `There was a problem getting your product, error: ${err}`
    }
  }
  
  
  async updateProduct(id, title, description, price, image, stock) {
    try {
      const products = await this.read()
      const foundProd = await this.readOne(id)
      
      if(foundProd !== 'Product not found') {
        const updatedValues = {
          title, description, price, image, stock, id
        }
        
        const index = products.findIndex((prod) => prod.id === foundProd.id)        
       
        products.splice(index, 1, updatedValues)
        await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t')) 

        return updatedValues
      }
      return foundProd

    } catch(err) {
      return `There was an error (${err}) getting the updated product`
    }
  }


  async deleteProduct(id) {
    try {
      const products = await this.read()
      const foundProd = await this.readOne(id)
      
      const index = products.findIndex((prod) => prod.id === foundProd.id)

      if(foundProd !== 'Product not found with specified ID') {
        console.log(foundProd)
        products.splice(index, 1)
        await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'))  
      }
      
      return foundProd
    
    } catch(err) {
      return `There was an error (${err}) deleting product`
    }
  }
}

const products = new ProductManager('./src/data/fs/files/products.json')
export default products

