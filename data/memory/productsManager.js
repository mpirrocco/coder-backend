class ProductsManager {
  #products

  constructor() {
    this.#products = []
  }

  create(title, description, image, price, stock) {
    const newProd = {
      title,
      description,
      image,
      price,
      stock
    }

    newProd.id = this.#products.length === 0 ? 1 : this.#products[this.#products.length - 1].id + 1

    this.#products.push(newProd)
    return this.#products
  }

  read() {
    return this.#products
  }

  readOne(pid) {
    const foundProd = this.#products.find(prod => prod.id === pid) 
    
    return foundProd ? foundProd : `Product not found with specified ID`
  }

  destroy(pid) {
    const products = this.read()
    const foundProd = this.readOne(pid)
     
    const index = products.findIndex((product) => product.id === foundProd.id)
    if(index !== -1) {
      products.splice(index, 1)
      return products
    } else {
      return `Product not found with specified ID`
    }
    return(index)
  }

  update(title, description, image, price, stock, pid) {
    const updatedValues = {
      title, description, image, price, stock, id:pid
    }

    const products = this.read()
    const foundProd = this.readOne(pid)

    const index = products.findIndex((product) => product.id === foundProd.id)
    if(index !== -1) {
      products.splice(index, 1, updatedValues)
      return products
    } else {
      return `Product not found with specified ID`
    }
    return products
  }
}

const productsManager = new ProductsManager()

// productsManager.create('Martillo', 'De clavos', 'sin imagen', 420, 6)
// productsManager.create('Martillo', 'Masa', 'sin imagen', 490, 6)
// productsManager.create('Martillo', 'Madera', 'sin imagen', 240, 6)


// console.log(productsManager.read())
// console.log(productsManager.readOne(3))
// console.log(productsManager.readOne(1))
// console.log(productsManager.readOne(6))
// console.log(productsManager.update('Pinza', 'Corta cables', 'no images', 79, 4, 1))

export default productsManager