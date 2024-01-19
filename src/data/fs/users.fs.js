import fs from 'fs'
import crypto from 'crypto'

class UserManager {
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
        let users = await fs.promises.readFile(this.path)
        return users = JSON.parse(users)
      } else {
        return []
      }
    } catch (err) {
      return `There was an error (${err}) getting the users list`
    }
  }

  async create(name, image, email) {
    try {
      const newUser = {
        name, image, email
      }
      
      let users = await this.read()
      newUser.id = this.generateID()

      if(
        !newUser.name ||
        !newUser.image || 
        !newUser.email ) {
          return `Please check that all information is included`          
        }
      
      users.push(newUser)
      await fs.promises.writeFile(this.path, JSON.stringify(users, null, '\t'))    

      return newUser
    } catch (err) {
      return `There was a problem (${err} adding the new user, please notify support)`      
    }
  }

  async readOne(id) {
    try {
      const users = await this.read()
      const foundUser = users.find(user => user.id === id)
      if(!foundUser) {
        return 'User not found'
      }
      return foundUser
    } catch (err) {
      return `There was a problem getting the searched user, please notify support, error: ${err}`      
    }
  }

  async updateUser(id, name, image, email) {
    try {
      const users = await this.read()
      const foundUser = await this.readOne(id)

      if(foundUser !== 'User not found') {
        const updatedValues = {
          name, image, email, id
        }

        const index = users.findIndex(user => user.id === foundUser.id)

        users.splice(index, 1, updatedValues)
        await fs.promises.writeFile(this.path, JSON.stringify(users, null, '\t'))

        return updatedValues
      }
    } catch (err) {
      return `There was an problem getting the updated user, error: ${err}`
    }
  }

  async deleteUser(id) {
    try {
      const users = await this.read()
      const foundUser = await this.readOne(id)
      
      const index = users.findIndex((user) => user.id === foundUser.id)

      if(foundUser !== 'User not found') {
        users.splice(index, 1)
        await fs.promises.writeFile('./data/montevideoUsers.json', JSON.stringify(users, null, '\t'))
      }
      return foundUser
    
    } catch(err) {
      return `There was a problem deleting the user, error: ${err}`
    }
  }
}

const users = new UserManager('./src/data/fs/files/users.json')
export default users

