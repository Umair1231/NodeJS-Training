const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  console.log(req.url, req.method);

  res.setHeader('Content-Type', 'text/html');

  let path = './views/'
  switch(req.url) {
    case('/'):
      path += 'index.html';
      break;
    case('/about'):
      path += 'about.html';
      break;
    default:
      path += 'notfound.html';
      break;
  }
  fs.readFile(path, (err, data) => {
    if(err)
    {
      console.log(err);
      res.end();
    }
    res.end(data)
  })
});

server.listen(3000, 'localhost', () => {
  console.log("listening on port 3000")
});