//@ts-check

const net = require("net");


let proxy_server = net.createServer(client => {

    let websocket_server = new net.Socket();

    let total_received = 0;
    let total_sent = 0;

    let buffer = null

    websocket_server.on('data', (buff) => {
        total_sent += buff.length;
        console.log("send +", buff.length, "receive:", total_received,  "send:", total_sent);
        client.write(buff);
    });

    websocket_server.connect(3999, '127.0.0.1', function(err) {
        if(err) {
            console.error("failed to connect 3999", err);
            return;
        }
        console.log("connect to ws server!");
    });
    
    client.on("data", (buff) => {
        total_received += buff.length;
        console.log("receive +", buff.length, "receive:", total_received,  "send:", total_sent);
        websocket_server.write(buff);
    });

    client.on("close", ()=> {
        console.log("client-closed!");
        websocket_server.end();
    });

    client.on("error", (err) => {
        console.log("client-error ", err);
    })

    websocket_server.on("close", () => {
        console.log("ws-server-closed!");
        client.end();
    })

});


proxy_server.listen(4000, "0.0.0.0");