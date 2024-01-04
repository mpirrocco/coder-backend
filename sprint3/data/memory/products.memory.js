import crypto from 'crypto'

class ProductManager {
  #products

  constructor(title, description, price, image, code, stock) {
    this.#products = []
  }

  generateID() {
    const id = crypto.randomBytes(12).toString('hex')
    console.log(id)
    return id
  }

  create(title, description, price, image, stock) {
    const newProd = {
      title, description, price, image, stock
    }
    
    newProd.id = this.generateID()
    
    if(
      !newProd.title ||
      !newProd.description || 
      !newProd.price || 
      !newProd.image || 
      !newProd.stock ) {
        console.log(`Please check that all information is included`)
        return
      }    
    
    this.#products.push(newProd)
    return newProd
  }
  
  readOne(id) {
    const foundProd = this.#products.find(prod => prod.id === id) 
    foundProd ? console.log(foundProd) : console.log('Product not found')
    return foundProd
  }
  
  read() {
    console.log(this.#products)
    return(this.#products)
  }
}

const productsInMemory = new ProductManager()
export default productsInMemory

productsInMemory.create('Screwdriver', 'Phillips style', 'no image', '23223', 3)
productsInMemory.create('Screwdriver', 'Flat style', 'no image', '23223', 3)
productsInMemory.create('Wrench', '6" adjustable', 'no image', '23228', 3)

productsInMemory.read()
productsInMemory.readOne(5)

