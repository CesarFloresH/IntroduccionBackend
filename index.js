const http = require('http');
const hostname = '192.168.50.123';
const port = 3000;
const server = http.createServer((req,res) => {
    res.statuscode = 200;
    res.setHeader('Content-Type','text/plain');
    res.end('Hola Mundo\n');
} );
server.listen(port,hostname,() =>{
    console.log("el servidor se esta ejecuntando en http://${hostname}:${port}/");
});