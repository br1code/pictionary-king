'use strict';

const socketIO                           = include('socket.io');

function createSocket(server) {
    const io = socketIO(server);

    io.on('connection', newConnection);
}

function newConnection(socket) {
    console.log('New user connected');
    
    // handle events with socket.on(event, callback)
}

module.exports = {
    createSocket
};