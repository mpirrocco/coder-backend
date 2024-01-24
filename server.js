
import ProductsManager from "./app/fs/productsManager.fs.js"

const productsManager = new ProductsManager('./app/fs/data/products.json')

// productsManager.create('Martillo', 'Enano', 'sin imagen', 480, 3)

// console.log(productsManager.readOne('720e19b99989383038285e05'))

productsManager.read().then(res => console.log(res))