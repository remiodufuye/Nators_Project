const EventEmitter = require('events');
const http = require('http');

class Sales extends EventEmitter {
  constructor() {
    super();
  }
}

const MyEmitter = new Sales();

MyEmitter.on('newSale', () => {
  console.log('There was a new Sale');
});

MyEmitter.on('newSale', () => {
  console.log('Customer Name : Remi');
});

MyEmitter.on('newSale', stock => {
  console.log(`There are ${stock} items left in Stock!`);
});

MyEmitter.emit('newSale', 9);

/////////////////////////////////////////////////////

const server = http.createServer();

server.on('request', (req, res) => {
  console.log('Request Received!!!');
  console.log(req.url);
  res.end('Request Received');
});

server.on('request', (req, res) => {
  console.log('Another Request 👩🏽‍💻');
});

server.on('close', () => {
  console.log('Server Closed');
});

server.listen(8000, '127.0.0.1', () => {
  console.log('Waiting for Request!!');
});
