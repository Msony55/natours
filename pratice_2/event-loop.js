const fs = require('fs');
const crypto = require('crypto');
const date = Date.now();

process.env.UV_THREADPOOL_SIZE = 4;

setImmediate(() => console.log("Immediate 1 Fineshed")); //4ms
setTimeout(() => console.log("Timer 1 Fineshed"), 4); //2nd fastest
process.nextTick(() => console.log("Process.nextTick"));

fs.readFile('pratice_2.txt',() => {
    console.log("I/O fineshed");
    console.log('------------------------------');

    setTimeout(() => console.log("Timer 2 Fineshed"), 0); 
    setTimeout(() => console.log("Timer 2 Fineshed"), 3000); 
    setImmediate(() => console.log("Immediate 2 Fineshed")); 


    // crypto.pbkdf2s("password","salt",100000,1024,"sha512",() => {
    //     console.log(Date.now()-date ,'password encryption');
    // });
    // crypto.pbkdf2("password","salt",100000,1024,"sha512",() => {
    //     console.log(Date.now()-date ,'password encryption');
    // });
    // crypto.pbkdf2("password","salt",100000,1024,"sha512",() => {
    //     console.log(Date.now()-date ,'password encryption');
    // });
    // crypto.pbkdf2("password","salt",100000,1024,"sha512",() => {
    //     console.log(Date.now()-date ,'password encryption');
    // });

    crypto.pbkdf2Sync("password","salt",100000,1024,"sha512");
    console.log(Date.now()-date ,'password encryption');

    crypto.pbkdf2Sync("password","salt",100000,1024,"sha512");
    console.log(Date.now()-date ,'password encryption');

    crypto.pbkdf2Sync("password","salt",100000,1024,"sha512");
    console.log(Date.now()-date ,'password encryption');

    
});
crypto.pbkdf2Sync("password","salt",100000,1024,"sha512");
console.log(Date.now()-date ,'password encryption');

console.log("Hello from top level code");