// console.log('socket connected')
const socket = io()

socket.on('welcome', message => console.log(message))
socket.on('newProductAdded', message => console.log(message))
socket.on('productsList', (data) => {
  const prodsList = data.map((el) => `
    <div class="card" style="width: 18rem;">
      <img src="${el.image}" class="card-img-top" alt="No image">
      <div class="card-body">
        <h5 class="card-title">${el.title}</h5>
        <p class="card-text">${el.description}</p>
        <p class="card-text">${el.price}</p>
        <a href="#" class="btn btn-primary">View product</a>
      </div>
    </div>`
  ).join('')
  console.log(prodsList)
  const content = document.querySelector('#products-list')
  content.innerHTML = prodsList
})
  


const form = document.querySelector('form')
const title = document.querySelector('#title')
const description = document.querySelector('#description')
const img = document.querySelector('#img')
const price = document.querySelector('#price')
const stock = document.querySelector('#stock')
const submit = document.querySelector('#submit')



form.addEventListener('submit', (e) => {
  e.preventDefault()
  socket.emit('newProduct', {
    title: title.value,
    description: description.value,
    image: img.value,
    price: price.value,
    stock: stock.value
  })
  title.value = ''
  description.value = ''
  img.value = ''
  price.value = ''
  stock.value = ''
})



