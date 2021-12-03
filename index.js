const express = require('express')
const app = express()
const port = 3000
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
io.on('connection', (socket) => {
  socket.on('disconnect', () => {
    console.log('logger disconnected');
  });
});

app.use(express.static('public'))
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.post('/log', (req, res) => {
  const time = req.body.time;
  const value = req.body.value;
  io.emit('ota-log', {time: time, value: value});
  res.status(200);
  res.send()
})

server.listen(3000, () => {
  console.log('listening on *:3000');
});
