const http = require('http');
const path = require('path');
const fs = require('fs');

const server = http.createServer((req, res) => {
    console.log(req.url);//shows the url you try to connect to when you run node index.js in cmd.

    // Build file path
    let filePath = path.join(__dirname, 'public', req.url === '/' ? 'home.html' : req.url)

    
    // Extension of file
    let extname = path.extname(filePath);

    // Initial content type
    let contenType = 'text/html';

    // Check extension and set the content type
    switch(extname){
        case '.js':
            contenType = 'text/javascript';
            break;
        case '.css':
            contenType = 'text/css';
            break;     
        case '.json':
            contenType = 'application/json';
            break;     
        case '.png':
            contenType = 'image/png';
            break;
        case '.jpg':
            contenType = 'image/jpg';
               break;
    }

    //Read File - this  function 
    fs.readFile(filePath, (err, content) => {
        if(err){
            if(err.code == 'ENOENT'){
                // page not found
                fs.readFile(path.join(__dirname, 'public', '404.html'), (err, content) => {
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.end(content, 'utf8');
                })
            } else {
                // some server error 500
                res.writeHead(500);
                res.end(`Server Error: ${err.code}`);
            }
        } else {
            //success
            res.writeHead(200, { 'Content-Type': contenType })
            res.end(content, 'utf8');
        }
    })
});


const PORT = process.env.PORT || 5000; 

server.listen(PORT, () => console.log(`Server running on port: ${PORT}.`));


