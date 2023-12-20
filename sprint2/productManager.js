const fs = require('fs')

class ProductManager {
  constructor(path) {
    this.path = path
  }
  
  async read() {    
    try {
      if(await fs.existsSync(this.path)) {
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
      newProd.id = !products.length ? 1 : products[products.length -1].id + 1

      if(
        !newProd.title ||
        !newProd.description || 
        !newProd.price || 
        !newProd.image || 
        !newProd.stock ) {
          return `Please check that all information is included`          
        }
       
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
       return 'Product not found'
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

      if(foundProd !== 'Product not found') {
        products.splice(index, 1)
        await fs.promises.writeFile('./data/catalogue.json', JSON.stringify(products, null, '\t'))
      }
      return foundProd
    
    } catch(err) {
      return `There was an error (${err}) deleting product`
    }
  }
}

const summerCatalogue = new ProductManager('./data/catalogue.json')

// summerCatalogue.create('Screwdriver', 'Phillips style',30, 'no image', 3)
// .then(res => summerCatalogue.create('Screwdriver', 'Flat style', 60, 'no image', 3))
// .then(res => summerCatalogue.create('Wrench', '6" adjustable', 160, 'no image', 3))

// summerCatalogue.create('Bycicle seat', 'Mountain bike style', 160, 'no image', 3).then(res => console.log(res))

summerCatalogue.updateProduct(4, 'Bycicle seat', 'Mountain Bike style', 265, 'no image', 15).then(res => console.log(res))

// summerCatalogue.read().then(res => console.log(res))

// summerCatalogue.readOne(8).then(res => console.log(res))

// summerCatalogue.deleteProduct(1).then(res => console.log(res))

