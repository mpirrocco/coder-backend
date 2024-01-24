import fs from 'fs'
import crypto from 'crypto'

class UsersManager {
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
        let users = await fs.promises.readFile(this.path)
        return users = JSON.parse(users)
      } else {
        return []
      }
    } catch (error) {
      return `There was an error getting the users list, error: ${err}`
    }
  }

  async create(name, image, email) {
    try {
      const newUser = {
        name, image, email, id: this.generateID()
      }  
      
      let users = await this.read()
      users.push(newUser) 
      // console.log(users)
      await fs.promises.writeFile(this.path, JSON.stringify(users, null, '\t'))    

      return newUser
    } catch(err) {
      return `There was a problem adding your user, error: ${err}`
    }    
  }

  async readOne(uid) {
    try {
      const users = await this.read()
      const foundUser = users.find((user) => user.id === uid)

      if(!foundUser) {
        return `User not found with the provided ID`
      }
      // return foundUser
      return foundUser
      
    } catch (error) {
      return `There was a problem getting your user, error: ${error}`
    }
  }
}

export default UsersManager