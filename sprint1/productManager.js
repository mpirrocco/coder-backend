class ProductManager {
  #products

  constructor(title, description, price, image, code, stock) {
    this.#products = []
  }

  create(title, description, price, image, stock) {
    const newProd = {
      title, description, price, image, stock
    }
    
    newProd.id = !this.#products.length ? 1 : this.#products[this.#products.length -1].id + 1
    
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

const summerCatalogue = new ProductManager()

summerCatalogue.create('Screwdriver', 'Phillips style', 'no image', '23223', 3)
summerCatalogue.create('Screwdriver', 'Flat style', 'no image', '23223', 3)
summerCatalogue.create('Wrench', '6" adjustable', 'no image', '23228', 3)

summerCatalogue.read()
summerCatalogue.readOne(5)

