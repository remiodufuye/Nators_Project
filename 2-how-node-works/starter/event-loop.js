const fs = require('fs');
const crypto = require('crypto');
const start = Date.now();

setTimeout(() => console.log('Timer 1 Finished'), 0);
setImmediate(() => console.log('Immediate 1 Finished'));

fs.readFile('test-file.txt', () => {
  console.log('I/O finished!');
  setTimeout(() => console.log('Timer 2 Finished'), 0);
  setTimeout(() => console.log('Timer 3 Finished'), 30);
  setImmediate(() => console.log('Immediate 2 Finished'));

  process.nextTick(() => console.log('Process.nextTick'));

  crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {});
  console.log(Date.now() - start, 'Password Encypted');
  crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {});
  console.log(Date.now() - start, 'Password Encypted');
  crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {});
  console.log(Date.now() - start, 'Password Encypted');
  crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {});
  console.log(Date.now() - start, 'Password Encypted');
});

console.log('Hello From the Top Level Code!');
