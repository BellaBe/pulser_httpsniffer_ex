const util = require('util');
const url = require('url');

const timestamp = () =>{
  return new Date().toISOString();
}

exports.sniffOn = (server)=>{
  server.on('request', (req, res) => {
    console.log(`${timestamp()} e_request`);
    console.log(`${timestamp()} ${reqToString(req)}`)
  });
  server.on('close', errno =>{
    console.log(`${timestamp()} e_close ${errno}`)
  });
  server.on('checkContinue', (req, res) =>{
    console.log(`${timestamp()} e_checkContinue`);
    console.log(`${timestamp()} ${reqToString(req)}`);
    res.writeContinue();
  });
  server.on('upgrade', (req, socket, head) =>{
    console.log(`${timestamp()} e_upgrade`);
    console.log(`${timestamp()} ${reqToString(req)}`);
  });
  server.on('clientError', () =>{
    console.log(`${timestamp()} e_clientError`);
  });

}

  const reqToString = exports.reqToString = (req) =>{
    let ret = `req ${req.method} ${req.httpVersion} ${req.url}` + '\n';
    ret += JSON.stringify(url.parse(req.url, true)) + '\n';
    const keys = Object.keys(req.headers);
    for(let i = 0, l = keys.length; i < l; i++){
      const key = keys[i];
      ret += `${i} ${key}: ${req.headers[key]}` + '\n';
    }
    if(req.trailers) ret += util.inspect(req.trailers) + '\n';
    return ret;
  }