const WebSocket = require('ws');
//const http = require("http");
const fs = require('fs');

const wss = new WebSocket.Server({
  port: 3999,
  perMessageDeflate: {
    zlibDeflateOptions: {
      // See zlib defaults.
      chunkSize: 1024,
      memLevel: 7,
      level: 3
    },
    zlibInflateOptions: {
      chunkSize: 10 * 1024
    },
    // Other options settable:
    clientNoContextTakeover: true, // Defaults to negotiated value.
    serverNoContextTakeover: true, // Defaults to negotiated value.
    serverMaxWindowBits: 10, // Defaults to negotiated value.
    // Below options specified as default values.
    concurrencyLimit: 10, // Limits zlib concurrency for perf.
    threshold: 1024 // Size (in bytes) below which messages
    // should not be compressed.
  }
});


wss.on("connection", (ws)=> {
    console.log("connected!~");
    ws.on("message", (message) => {
        console.log(`receive mesasge: "${message.slice(0, 30)}"...`);
        console.log(`         length: ${message.length}`);
        //ws.send(fs.readFileSync("/home/jiang/Downloads/bigdata.txt"));
        ws.send(message);
    });

    ws.send("hello");

    ws.on("close", ()=>{
        console.log("disconnected!~");
    });
});
