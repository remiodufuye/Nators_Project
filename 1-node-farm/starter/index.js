const fs = require('fs') ;
const http = require('http') ; 


///////////////////////////////
// FILES 
//////////////////////////////

// Blocking Synchronous Way 
// const textIn = fs.readFileSync('./txt/input.txt','utf-8') ;
// console.log(textIn) ;
// const textOut = ` This is what we know about the Avocado: ${textIn} .\n created on ${Date.now()}` ; 
// fs.writeFileSync('./txt/output.txt',textOut) ; 
// console.log('The File has been written') ;  

// Non-Blocking Asynchronous Way  
// fs.readFile('./txt/start.txt','utf-8', (err,data1) => {
//     if (err)  return console.log("Covid 😷😷!!! ") ; 
//     fs.readFile(`./txt/${data1}.txt`,'utf-8', (err,data2) => {
//         console.log(data2) 
//         fs.readFile(`./txt/append.txt`,'utf-8', (err,data3) => {
//             console.log(data3) ;

//             fs.writeFile('./txt/final.txt', `${data2}\n ${data3}`, 'utf-8', err => {
//                 console.log('Your File has been written 😁!! ') ; 
//             })
//         }) ;  
//     }) ;  
// }) ; 
// console.log('Will Read File!!') ;  


///////////////////////////////
// SERVER 
////////////////////////////// 