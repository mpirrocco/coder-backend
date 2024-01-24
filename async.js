import fs from 'fs'

const file = './app/fs/data/products.json'

const read = async () => {
  try {

    if(fs.existsSync(file)) {
      const data = await fs.promises.readFile(file)
      const products = JSON.parse(data)
      return products
    } else {
      return []
    }

    

  } catch (error) {
    return error
  }
  
}

read().then(res => console.log(res))