const express = require('express');
const app = express();
const http = require('http');
const { Server } = require('socket.io')
const cors = require('cors');
app.use(cors({ origin: "https://localhost:5173", credentials: true }));

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'https://localhost:5173',
    methods: ['GET', 'POST'],
  }
})

io.on("connection", (socket) => {
  console.log(`User connected to ${socket.id}`)

  socket.on("join_room", (data) => {
    socket.join(data)
  })

  socket.on("send_message", (data) => {
    console.log(data)
    socket.to(data.room).emit("receive_message", data)
  })
})

server.listen(3000, () => {
  console.log('listening on port 3000');
})