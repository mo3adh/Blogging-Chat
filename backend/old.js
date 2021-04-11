




io.on('connection', (socket) => {
    console.log("New client connected");
    if(interval) clearInterval(interval);
    interval = setInterval(() => getApiAndEmit(socket), 1000);
    socket.on('disconnect', () => {
        console.log("Client disconnected");
        clearInterval(interval);
    })
});

const getApiAndEmit = socket => {
    socket.emit('message', 'Hello Fellows');
}