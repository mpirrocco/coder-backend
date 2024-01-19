import crypto from 'crypto'

class UserManager {
  #users

  constructor(name, image, email) {
    this.#users = []
  }

  generateID() {
    const id = crypto.randomBytes(12).toString('hex')
    console.log(id)
    return id
  }

  create(name, image, email) {
    const newUser = {
      name, image, email
    }

    newUser.id = this.generateID()

    if(
      !newUser.name ||
      !newUser.image || 
      !newUser.email ) {
        console.log(`Please check that all information is included`)
        return
      }    
    
    this.#users.push(newUser)
    return newUser
  }

  readOne(id) {
    const foundUser = this.#users.find(user => user.id === id)
    foundUser ? console.log(foundUser) : console.log('User not found')
    return foundUser
  }

  read() {
    console.log(this.#users)
    return(this.#users)
  }
}

const usersInMemory = new UserManager()
export default usersInMemory

usersInMemory.create('Rachel Adams', 'no image', 'rachel@mail.com')
usersInMemory.create('Lieutenant Dan', 'no image', 'dan@mail.com')
usersInMemory.read()