const http = require('http');
const fs = require('fs');
const jsonFile = './catalog.json';

console.log(JSON.parse(fs.readFileSync(jsonFile, 'utf8')))

http.createServer((req, res)=>{
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello world!\n')
}).listen(8124, '127.0.0.1');
console.log('Server is running on port 8124');