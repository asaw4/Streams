const fs = require('fs');
const server = require('http').createServer();

server.on('request', (req,res) => {

    //Solution 1 - Very lengthy, for a large file, this method will first read 
    // the file and store it in memory. This is time and memory ineffecient process
    // const data = fs.readFileSync('test-file.txt', 'utf-8', (err,data) => {
    //     if( err ) console.log(err);
    //     res.end(data);
    // });

    //Solution- 2 
    // here We are reading and writing data in chunks using stream
    // const readable = fs.createReadStream('test-file.txt', 'utf-8');
    // readable.on('data', chunk => {
    //     res.write(chunk);
    // });
    // readable.on('end', () => {
    //     res.end(); 
    // });
    // readable.on('error', (err) => {
    //     console.log(err);
    //     res.statusCode = 500;
    //     res.end(err);
    // })
    

    //Problem with second method is  : BACK PRESSURE 
    // all readable stream is much faster than the response stream 
    // i.e. the rate of receiving is much faster than the rate of sending response
    // for response stream;

    //Solution- 3
    //created a pipe : solves back pressure
    const readable = fs.createReadStream('test-file.txt', 'utf-8');
    readable.pipe(res);
    // readableSource.pipe(writeableDestination)
    });

    server.listen(3000, '127.0.0.1', () =>{
        console.log('Listening...');
    });