const fs = require('fs');
const server = require('http').createServer();

server.on('request',(req,res) => {

    // Solution 1
    // fs.readFile('pratice_2.txt', (err,data) => {
    //     if(err) console.log(err);
    //     res.end(data);
    // });


    // Solutin 2: Streams   // receive fast but not send nearly as fast
    // const readeable = fs.createReadStream('pratice_2.txt')
    // readeable.on('data',chunk => {
    //     res.write(chunk);
    // });
    // readeable.on('end', () => {
    //     res.end();
    // });
    // readeable.on('error', err => {
    //     console.log(err);
    //     res.statusCode = 500;
    //     res.end('File not found');
    // })


    // Solution 3: 
    const readeable = fs.createReadStream('pratice_2.txt');
    readeable.pipe(res);
    // readeableSource.pipe(writeableDestination);

});

server.listen(8000,'127.0.0.1',() => {
    console.log("Server is running at 8000....");
});