// const EventEmitter = require('events');
const http = require('http');

// ES6
//---Parant class----Super class----//
// class Sales extends EventEmitter {
//     constructor(){
//         super();
//     }
// }
// const myEmitter = new Sales();



// /////////////////////////////////////////
// custom event
// // const myEmitter = new EventEmitter();

// myEmitter.on('newSales',() => {
//     console.log("There was a new Sales!!");
// })

// myEmitter.on('newSales',() => {
//     console.log("Coutumer name : John");
// })

// myEmitter.on('newSales', (stock,productName) => {
//     console.log(`There is no of left ${productName} is ${stock}`);
// })

// myEmitter.emit('newSales', 9, 'jiofiber');


////////////////////////////////////////////////////
// predefine event
const server = http.createServer();

server.on("request",(req,res) => {
    console.log("Request Received");
    console.log(req.url);
    res.end("Request Received");
});

server.on("request",(req,res) => {
    console.log("Another Request");
});

server.on("close",() => {
    console.log("Server close");
});

server.listen(8000, "127.0.0.1", () => {
    console.log("waiting for request....");
})
