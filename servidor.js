var http = require ('http');
var os = require("os"); 
os.hostname();
var fs = require ('fs');
var path = require ('path');

http.createServer(function(request, response){
    console.log('request', request.url);
    var filePath = '.' + request.url;
    if(filePath == './'){
        filePath = "./index.html";
    }
    var extname = String(path.extname(filePath)).toLowerCase();
    var contentType = 'text/html';
    var mimeTypes = {
        '.html' : 'text/html', 
        '.js' : 'text/javascript',
        '.css' : 'text/css',
        '.jpg' : 'image/jpg'
    };
    contentType = mimeTypes[extname] || 'application/octet-stream';
    fs.readFile(filePath, function(error, content){
        if(error){
            if(error.code == 'ENOENT'){
                fs.readFile('./404.html',function(error,content){
                   response.writeHead(200,{'Content-Type': contentType});
                   response.end(content, 'utf-8'); 
                });
            }
            else{
                response.writeHead(500);
                response.end('sorry, check with the site admin for error: '+ error.code+'..\n');
                response.end();
            }
        }else{
            response.writeHead(200, { 'Content-Type': contentType});
            response.end(content,'utf-8');
        }
    });
}).listen(3000);
console.log('Server running at http://${os}:3000/');

