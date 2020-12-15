// requiring packages
const http = require('http')
const express = require('express')
const userRouter = require('./router/userRouter')
const anonymousRouter = require('./router/anonymous')
const bodyParser = require('body-parser')
const socketio = require('socket.io')

const port = process.env.PORT || 3000    // setting port


const app = express()
const server = http.createServer(app)
const io = socketio(server)

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use(express.static('public'))
app.use(userRouter)
app.use(anonymousRouter)

server.listen(port, () => {
    console.log('Listening on port ', port)
})
