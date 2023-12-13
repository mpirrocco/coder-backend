class UserManager {
  #users

  constructor(name, image, email) {
    this.#users = []
  }

  create(name, image, email) {
    const newUser = {
      name, image, email
    }

    newUser.id = !this.#users.length ? 1 : this.#users[this.#users.length -1].id + 1

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

const storeUsers = new UserManager()

storeUsers.create('Rachel Adams', 'no image', 'rachel@mail.com')
storeUsers.create('Laura Barzilai', 'no image', 'laura@mail.com')
storeUsers.create('Damián Pirrocco', 'no image', 'damian@mail.com')
storeUsers.read()