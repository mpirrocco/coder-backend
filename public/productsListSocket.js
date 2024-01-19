const socket = io()

socket.on('welcome', message => console.log(message + ' Carga productos'))

const content = document.querySelector('#products-list')

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