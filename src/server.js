require('dotenv').config();
const express = require('express');
const ejs = require('ejs');
const app = express();
const { Server } = require('socket.io')
const PORT = process.env.PORT || 8000
const path = require('path');
const router = require('./routes/routes');
const cookieParser = require('cookie-parser');
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, '/public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(router);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
app.use('/*', (_, res) => res.sendStatus(404))


const server = app.listen(PORT, console.log(PORT))

const io = new Server(server)

io.on('connection', socket => {
    socket.on('user-joined', ({ ism}) => {
        // console.log(ism);
        socket.emit('new-user-joined', ism)
    })

    socket.on('new-message', data => {
        socket
            .broadcast
            .emit('new-user-message', data)
    })
})