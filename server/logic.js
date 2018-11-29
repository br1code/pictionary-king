'use strict';

const socketIO                           = include('socket.io');

function createSocket(server) {
    const io = socketIO(server);

    io.on('connection', newConnection);
}

function newConnection(socket) {
    console.log('New user connected');
    
    socket.on('draw', (data) => {
        socket.broadcast.emit('draw', data);
    });
}

module.exports = {
    createSocket
};