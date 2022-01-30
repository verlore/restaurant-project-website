//at nodejs.org go to doc to find useful documentaion, for instance path is used for file directories.
// cd into this director and run node filename to see what happens in the console.

// const Person = require('./person'); // how to import from other files. ./ means it is in the same folder.
// const Logger = require('./logger');

// const logger = new Logger(); // run the node logger.js in cmd.

// logger.on('message', data => console.log('Called Listener: ', data));
// logger.log('Hello World!'); // the .log comes from the class Logger in the logger.js file. This write hello world to the webpage.

// const person1 = new Person('John Doe', 24);
// person1.greeting();

// practice stuff from video^^^
// making website with just node below

const http = require('http');
const path = require('path');
const fs = require('fs');

const server = http.createServer((req, res) => {
    console.log(req.url);//shows the url you try to connect to when you run node index.js in cmd.

    // if(req.url === '/') { // checking the request of the url. this is the homepage url = localhost:5000/
    //     fs.readFile(path.join(__dirname, 'public', 'home.html'), (err, content) => { // reads a file in the public folder, second paramater is the callback.
    //         if(err) throw err;
    //         res.writeHead(200, { 'Content-Type': 'text/html' }) // this is creating the html code.
    //         res.end(content);
    //     })

    // }

    // if(req.url === '/about') { 
    //     fs.readFile(path.join(__dirname, 'public', 'about.html'), (err, content) => { 
    //         if(err) throw err;
    //         res.writeHead(200, { 'Content-Type': 'text/html' }) 
    //         res.end(content);
    //     })

    // }

    // if(req.url === '/api/users') {     
    //     const users = [
    //         {name: "John", age: 24},
    //         {name: "Arminda", age: 23}
    //     ];
    //     res.writeHead(200, { 'Content-Type': 'application/json' })
    //     res.end(JSON.stringify(users));
    // }

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


const PORT = process.env.PORT || 5000; // enviorment variable is the port that you deploy to. will look for process.env.PORT first, if not then 5000.

server.listen(PORT, () => console.log(`Server running on port: ${PORT}.`));

//use nodemon index instead of node index to update while looking at the broswer.
// use npm run dev

