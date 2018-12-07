const http = require('http');
const util = require('util');
const url = require('url');
const os = require('os');

const server = http.createServer();
server.on('request', (req, res) =>{
  const requrl = url.parse(req.url, true);
  if(requrl.pathname === '/'){
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(
      `
      <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>
<body>
  <h1>Hello, world</h1>
  <p><a href="/osinfo">OS system info</a></p>
  
</body>
</html>
      `
    )
  }else if(requrl.pathname === '/osinfo'){
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(
      `
      <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>OS system info</title>
</head>
<body>
  <h1>Operating system info</h1>
  <table>
    <tr>
      <th>TMP Dir</th>
      <td>${os.tmpdir()}</td>
    </tr>
    <tr>
      <th>Host name</th>
      <td>${os.hostname()}</td>
    </tr>
    <tr>
      <th>OS type</th>
      <td>${os.type()} ${os.platform()} ${os.arch()} ${os.release()}</td>
    </tr>
    <tr>
      <th>Uptime</th>
      <td>${os.uptime()} ${util.inspect(os.loadavg())}</td>
    </tr>
    <tr>
      <th>Memory</th>
      <td>total ${os.totalmem()} free: ${os.freemem}</td>
    </tr>
    <tr>
      <th>CPU's</th>
      <td><pre>${util.inspect(os.cpus())}</pre></td>
    </tr>
    <tr>
      <th>Network</th>
      <td><pre>${util.inspect(os.networkInterfaces())}</pre></td>
    </tr>
  </table>
  
</body>
</html>
      `
    )
  }else{
    res.writeHead(404, {'Content-Type': 'text/plain'});
    res.end(`Bad URL ${req.url}`);
  }
});
require('./httpsniffer').sniffOn(server);
server.listen(8124);
console.log('App is running on port 8124')