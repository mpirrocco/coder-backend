class ProductsManager {
  #products 

  constructor(data) {
   this. #products = []
  }

  create(title, description, image, price, stock) {
    const newProd = {
      title,
      description,
      image,
      price,
      stock
    }

    newProd.id = this.#products.length === 0
    ? 1
    : this.#products[this.#products.length - 1].id + 1

    this.#products.push(newProd)

    return this.#products
  }

  read() {
    return this.#products
  }

  readOne() {

  }

  destroy() {

  }

  update() {

  }

}

const productsManager = new ProductsManager()

productsManager.create('Martillo', 'De clavos', 'sin imagen', '420', '6')
productsManager.create('Martillo', 'Masa', 'sin imagen', '490', '6')
productsManager.create('Martillo', 'Madera', 'sin imagen', '240', '6')


console.log(productsManager.read())

// export default productsManager