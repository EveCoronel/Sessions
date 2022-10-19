// @ts-nocheck
const Products = require('./models/products');
const Messages = require('./models/messages');
const { formatMessage } = require('./utils/utils')
const dbConfig = require('./db/config');
const express = require('express')
const { Server: HttpServer } = require('http');
const { Server: SocketServer } = require('socket.io')
const PORT = process.env.PORT || 8080

// Instanciamiento 
const app = express();
const httpServer = new HttpServer(app);
const io = new SocketServer(httpServer);


//MiddleWares

app.use(express.static("./public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

//
let products = new Products('products', dbConfig.mariaDB)
let messages = new Messages('messages', dbConfig.sqlite)


const serverConnected = httpServer.listen(PORT, () => {
    console.log("Server is up and running on Port", PORT)
})

serverConnected.on('error', (error) => {
    console.log(error.message)
})

const users = []

io.on('connection', (socket) => {
    console.log('New client connection')

    products.getAll().then(data => socket.emit('products-history', data));

    socket.on('newProduct', (newProduct) => {

        products.save(newProduct).then(products.getAll().then(data => io.sockets.emit('products-history', data)))


    });

    socket.on('join-chat', (email) => {

        let newUser = {
            id: socket.id,
            email
        }

        users.push(newUser)
    })

    messages.getAll().then(data => socket.emit('messages', data));

    socket.on('new-message', (data) => {

        const author = users.find(user => user.id === socket.id)
        let message = formatMessage(author.email, data)
        messages.newMessage(message)
        messages.getAll()
            .then((data))
            .then((msg) => {
                io.emit('messages', msg)
            })
    })
})

app.get('/products', (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
})

app.post('/products', (req, res) => {
    products.save(req.body)
    res.redirect('/products')
})

app.get('*', (req, res) => {
    res.status(404).send('Página no encontrada')
})