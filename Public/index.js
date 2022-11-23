// Socket server connection
const socket = io()

// Profile logout

/* const logoutBtn = document.getElementById('btn-logout')

logoutBtn.addEventListener('submit', (event) => {
    event.preventDefault()

    
}) */



// Products logic
const productTable = document.getElementById('products-table')
const nameInput = document.getElementById('name-input')
const descriptionInput = document.getElementById('description-input')
const stockInput = document.getElementById('stock-input')
const priceInput = document.getElementById('price-input')
const imageInput = document.getElementById('image-input')
const submitBtn = document.getElementById('products-form')

socket.on('products-history', (products) => {
    
    fetch('./views/partials/history.hbs')
        .then((data) => data.text())
        .then((serverTemplate) => {
            const template = Handlebars.compile(serverTemplate);
            const html = template({ products });
            productTable.innerHTML = html;
        })

});

submitBtn.addEventListener('submit', (event) => {

    event.preventDefault()

    let title = nameInput.value;
    let description = descriptionInput.value;
    let stock = stockInput.value;
    let price = priceInput.value;
    let thumbnail = imageInput.value;

    const newProduct = {
        title,
        description,
        stock,
        price,
        thumbnail
    }

    socket.emit("newProduct", newProduct)

    nameInput.value = "";
    stockInput.value = "";
    descriptionInput.value = "";
    priceInput.value = "";
    imageInput.value = "";
})


// Chat logic 

let chat = document.getElementById('messages-div')

socket.on('messages', (messages) => {

    chat.innerHTML = ''
    messages.forEach(element => {
        chat.innerHTML += `<span><strong>${element.username} ${element.time}</strong>${element.text}</span><br>`
    });

});

let emailForm = document.getElementById('email-form')
const emailInput = document.getElementById('email-input')
const chatForm = document.getElementById('chat-form')

emailForm.addEventListener('submit', (e) => {

    e.preventDefault()
    let email = emailInput.value;
    socket.emit('join-chat', email)
    emailInput.value = ""

    emailForm.innerHTML = ""

    let chatBtn = document.createElement('button')
    chatBtn.innerHTML = `Send`
    chatForm.appendChild(chatBtn)

})



const messageInput = document.getElementById('message-text')

chatForm.addEventListener('submit', (e) => {
    e.preventDefault()
    let message = messageInput.value;
    socket.emit('new-message', message)
    messageInput.value = '';

})
