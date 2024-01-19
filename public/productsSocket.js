const socket = io()

socket.on('welcome', message => console.log(message + ' Carga productos'))

const form = document.querySelector('form')
const title = document.querySelector('#title')
const description = document.querySelector('#description')
const img = document.querySelector('#img')
const price = document.querySelector('#price')
const stock = document.querySelector('#stock')
const submit = document.querySelector('#submit')

const content = document.querySelector('#products-list')


form.addEventListener('submit', (e) => {
  e.preventDefault()

  socket.emit('new product', {
    title: title.value,
    description: description.value,
    image: img.value,
    price: price.value,
    stock: stock.value
  })
  title.value = ''
  description.value = ''
  image.value = ''
  price.value = ''
  stock.value = ''
})

socket.on('loaded products', (data) => {
  content.textContent = 'Lista de productos actualizada'
  console.log(data)
  const products = data.map((prod) => {
    return `
    <div class="prod">
      <div class="prod-info">
        <h3>${prod.title}</h3>
        <p>${prod.description}</p>
        </div>
        <div class="img-container">
        <img src=${prod.image} alt="">
        <p class="price">U$S ${prod.price}</p>
      </div>
    </div>
    `
  }).join('')
  
  content.innerHTML = products
})
