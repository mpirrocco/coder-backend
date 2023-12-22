const fs = require('fs')

class UserManager {
  constructor(path) {
    this.path = path
  }

  

  async read() {
    try {
      if(await fs.existsSync(this.path)) {
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
      newUser.id = !users.length ? 1 : users[users.length - 1].id + 1 

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
          name, image, email
        }

        const index = users.findIndex(user => user.id === foundUser.id)

        users.splice(index, 1, updatedValues)
        await fs.promises.writeFile(this.path, JSON.stringify(users, null, '`t'))

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


const montevideoUsers = new UserManager('./data/montevideoUsers.json')

// montevideoUsers.create('Mario Pirrocco', 'no image', 'mario@mail.com')
// .then(res => montevideoUsers.create('Andrea deSouza', 'no image', 'andrea@mail.com'))
// .then(res => montevideoUsers.create('Ramón Cardozo', 'no image', 'ramon@mail.com'))

// montevideoUsers.read().then(res => console.log(res))
// montevideoUsers.readOne(3).then(res => console.log(res))
montevideoUsers.deleteUser(2).then(res => console.log(res))