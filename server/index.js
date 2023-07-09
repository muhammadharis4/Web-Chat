const express = require('express');
const app = express();
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');


const reactPort = 3000
const serverPort = 3001
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: `http://localhost:${reactPort}`,
        method: ["GET", "POST"]
    }
});

io.on('connection', (socket) => {
    console.log('User connected', socket.id);

    socket.on('join_room', (data) => {
        socket.join(data.room);
        console.log(`${data.username} with ID ${socket.id} joined room ${data.room}`);
    })

    socket.on('send_message', (data) => {
        socket.to(data.room).emit('receive_message', data);
        // console.log(`Message (${data.message}) sent to room ${data.room} by ${data.sender}`);
    })

    socket.on('disconnect', () => {
        console.log('user disconnected', socket.id);
    })
})

server.listen(serverPort, () => {
    console.log(`Server listening on port ${serverPort}`)
})