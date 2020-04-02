const os = require('os');

console.log('operating system information -------------');
console.log('os.arch()', os.arch()); // x64
console.log('os.platform():', os.platform()); // win32
console.log('os.type():', os.type()); // Windows_NT
console.log('os.uptime():', os.uptime()); // 53354.5432871
console.log('os.hostname():', os.hostname()); // DESKTOP-RRANDNC
console.log('os.release():', os.release()); // 10.0.15063

console.log('path -------------');
console.log('os.homedir():', os.homedir()); // C:\Users\gplee
console.log('os.tmpdir()', os.tmpdir()); // C:\Users\gplee\AppData\Local\Temp

console.log('memory information -------------');
console.log('os.freemem():', os.freemem()); // 9122930688
console.log('os.totalmem():', os.totalmem()); // 17060175872
