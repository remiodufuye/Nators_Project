const fs = require('fs') ;

// Blocking Synchronous Way 
// const textIn = fs.readFileSync('./txt/input.txt','utf-8') ;
// console.log(textIn) ;
// const textOut = ` This is what we know about the Avocado: ${textIn} .\n created on ${Date.now()}` ; 
// fs.writeFileSync('./txt/output.txt',textOut) ; 
// console.log('The File has been written') ;  

// Non-Blocking Asynchronous Way  
fs.readFile('./txt/start.txt','utf-8', (err,data) => {
    console.log(data)
}) ; 
console.log('Will Read File!!') ; 