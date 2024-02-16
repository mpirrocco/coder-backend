// console.log('socket connected')
const socket = io()

socket.on('welcome', message => console.log(message))
socket.on('newUserAdded', message => console.log(message))
socket.on('usersList', (data) => {
  const usersList = data.map((el) => `
    <div class="card" style="width: 18rem;">
      <img src="${el.image}" class="card-img-top" alt="No image">
      <div class="card-body"> 
        <h5 class="card-title">${el.name}</h5>
        <p class="card-text">${el.lastName}</p>
        <p class="card-text">${el.email}</p>
        <a href="#" class="btn btn-primary">View product</a>
      </div>
    </div>`
  ).join('')
  console.log(usersList)
  const content = document.querySelector('#users-list')
  content.innerHTML = usersList
})
  


const form = document.querySelector('form')
const firstName = document.querySelector('#first-name')
const lastName = document.querySelector('#last-name')
const email = document.querySelector('#email')
const img = document.querySelector('#image')
const submit = document.querySelector('#submit')



form.addEventListener('submit', (e) => {
  e.preventDefault()
  socket.emit('newUser', {
    firstName: firstName.value,
    lastName: lastName.value,
    image: img.value,
    email: email.value
  })
  firstName.value = ''
  lastName.value = ''
  img.value = ''
  email.value = ''
})



