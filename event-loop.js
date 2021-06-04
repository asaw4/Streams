const fs = require("fs");
const crypto = require('crypto');

const start = Date.now();

//Limiting the number of threads to 1. We can see incremental time for all the crypto process
//try with 2 or 3
process.env.UV_THREADPOOL_SIZE = 2;


// WHY
setTimeout( ()=> {
    console.log("This is setTimeout 1");
}, 0);

setImmediate( ()=> {
    console.log("This is setImmediate 1");
});


fs.readFile("readme.txt", () =>{

    console.log("I/O finished");
    console.log("-------------------");

    setTimeout(()=> console.log("This is setTimeout 2"), 0);
    setImmediate(()=> console.log("This is setImmediate2"));
    setTimeout( ()=> console.log("This is setTimeout 3 after 3 secs"));

    process.nextTick(()=> console.log("Inside tick"));


    // timer for 4 crypto fucntions is same because there are 3 threads available 
    // and all 4 are running on each single thread. This shows that event loop passes the 
    // processes to threads to take less load. It has 4 threads by default.
    // WE CAN CLEARLY SEE THAT 4 THREADS PROCESSED IN ALMOST SAME TIME BUT THE 5TH ONE IS TAKING MORE TIME

    crypto.pbkdf2('password', 'salt', 10000, 1024, 'sha512', ()=> {
        console.log(Date.now() - start, "Password Encrypted");
    });

    crypto.pbkdf2('password', 'salt', 10000, 1024, 'sha512', ()=> {
        console.log(Date.now() - start, "Password Encrypted");
    });

    crypto.pbkdf2('password', 'salt', 10000, 1024, 'sha512', ()=> {
        console.log(Date.now() - start, "Password Encrypted");
    });

    crypto.pbkdf2('password', 'salt', 10000, 1024, 'sha512', ()=> {
        console.log(Date.now() - start, "Password Encrypted");
    });

    crypto.pbkdf2('password', 'salt', 10000, 1024, 'sha512', ()=> {
        console.log(Date.now() - start, "Password Encrypted");
    });
});


console.log("This is the last line.");