//@ts-check

const server = require('http').createServer();

const io = require('socket.io')(server);

io.on('connection', client => {

    console.log("conntected!");

    client.emit("message", "connected!!");

    client.emit("testevent", {hello: "abc"});
    
    client.on("message", data => {
        console.log(`on message ${data}`);
        client.emit("echotest", data);
        client.emit("testevent", {hello: "abc"});
    });

    client.on('event', data => { /* … */ });
    client.on('disconnect', () => { 
        console.log("disconnected!~");
    });
}
);

server.listen(4000);