
import ProductsManager from "./app/fs/productsManager.fs.js"
import UsersManager from "./app/fs/usersManager.fs.js"

const productsManager = new ProductsManager('./app/fs/data/products.json')
const usersManager = new UsersManager('./app/fs/data/users.json')

// productsManager.create('Martillo', 'Enano', 'sin imagen', 480, 3)
// productsManager.read().then(res => console.log(res))


// usersManager.create('Matías Pirrocco', 'no image', 'matias@email.com')
//   .then(() => {
//     usersManager.create('Silvina Callejas', 'no image', 'silvina@email.com')
//   })
//   .then(() => usersManager.read())
//   .then(res => console.log(res))

// usersManager.readOne('49360a5f99ea59ef93882cfa').then(res => console.log(res))

