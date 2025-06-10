const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public'));

io.on('connection', socket => {
  console.log('Usuário conectado');

  socket.on('entrarNaSala', (sala) => {
    socket.join(sala);
    socket.salaAtual = sala;
    console.log(`Usuário entrou na sala: ${sala}`);
  });

  socket.on('mensagemSala', (data) => {
    io.to(data.sala).emit('mensagemSala', data);
  });

  socket.on('disconnect', () => {
    console.log('Usuário desconectado');
  });
});

server.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
